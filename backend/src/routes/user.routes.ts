import express, { Router, Response } from 'express';
import { supabase } from '../config/database';
import { AuthRequest, authenticateJWT } from '../middleware/auth.middleware';
import { upload, uploadToCloudinary } from '../config/cloudinary';

const router: Router = express.Router();

// Get user profile
router.get('/:id', async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    const { data: user, error } = await supabase
      .from('users')
      .select('id, name, email, avatar, verified, trust_score, created_at, response_time')
      .eq('id', id)
      .single();

    if (error || !user) {
      res.status(404).json({ success: false, message: 'User not found' });
      return;
    }

    // Get user's listings count
    const { count: listingsCount } = await supabase
      .from('properties')
      .select('*', { count: 'exact', head: true })
      .eq('host_id', id)
      .eq('status', 'approved');

    // Get user's reviews
    const { data: reviews } = await supabase
      .from('reviews')
      .select('*')
      .eq('host_id', id)
      .limit(5);

    res.json({
      success: true,
      data: {
        user,
        stats: {
          listingsCount: listingsCount || 0,
          reviewsCount: reviews?.length || 0
        },
        recentReviews: reviews
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch user' });
  }
});

// Update user profile
router.put('/profile', authenticateJWT, async (req: AuthRequest, res: Response) => {
  try {
    const { name, phone, bio } = req.body;

    const { data: user, error } = await supabase
      .from('users')
      .update({ name, phone, bio })
      .eq('id', req.user!.id)
      .select('id, name, email, phone, bio, avatar, verified, trust_score')
      .single();

    if (error) throw error;

    res.json({
      success: true,
      message: 'Profile updated successfully',
      data: { user }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to update profile' });
  }
});

// Upload avatar
router.post(
  '/avatar',
  authenticateJWT,
  upload.single('avatar'),
  async (req: AuthRequest, res: Response) => {
    try {
      if (!req.file) {
        res.status(400).json({ success: false, message: 'No file uploaded' });
        return;
      }

      const { url } = await uploadToCloudinary(req.file.buffer, 'rentify/avatars');

      const { data: user, error } = await supabase
        .from('users')
        .update({ avatar: url })
        .eq('id', req.user!.id)
        .select('avatar')
        .single();

      if (error) throw error;

      res.json({
        success: true,
        message: 'Avatar uploaded successfully',
        data: { avatar: user.avatar }
      });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Failed to upload avatar' });
    }
  }
);

// Get user's properties
router.get('/:id/properties', async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    const { data: properties, error } = await supabase
      .from('properties')
      .select('*')
      .eq('host_id', id)
      .eq('status', 'approved');

    if (error) throw error;

    res.json({
      success: true,
      data: { properties }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch properties' });
  }
});

// Get saved/liked properties
router.get('/me/saved', authenticateJWT, async (req: AuthRequest, res: Response) => {
  try {
    const { data: saved, error } = await supabase
      .from('saved_properties')
      .select(`
        property_id,
        properties(*)
      `)
      .eq('user_id', req.user!.id);

    if (error) throw error;

    res.json({
      success: true,
      data: { properties: saved?.map(s => s.properties) || [] }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch saved properties' });
  }
});

// Save/like property
router.post('/me/saved/:propertyId', authenticateJWT, async (req: AuthRequest, res: Response) => {
  try {
    const { propertyId } = req.params;

    const { error } = await supabase
      .from('saved_properties')
      .insert([{ user_id: req.user!.id, property_id: propertyId }]);

    if (error) {
      // Check if already saved
      if (error.code === '23505') {
        res.status(400).json({ success: false, message: 'Property already saved' });
        return;
      }
      throw error;
    }

    res.json({
      success: true,
      message: 'Property saved successfully'
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to save property' });
  }
});

// Remove saved property
router.delete('/me/saved/:propertyId', authenticateJWT, async (req: AuthRequest, res: Response) => {
  try {
    const { propertyId } = req.params;

    const { error } = await supabase
      .from('saved_properties')
      .delete()
      .eq('user_id', req.user!.id)
      .eq('property_id', propertyId);

    if (error) throw error;

    res.json({
      success: true,
      message: 'Property removed from saved'
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to remove saved property' });
  }
});

export default router;
