import express, { Router, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { supabase } from '../config/database';
import { AuthRequest, authenticateJWT } from '../middleware/auth.middleware';

const router: Router = express.Router();

// Get reviews for a property
router.get('/property/:propertyId', async (req: AuthRequest, res: Response) => {
  try {
    const { propertyId } = req.params;

    const { data: reviews, error } = await supabase
      .from('reviews')
      .select(`
        *,
        user:users!reviews_user_id_fkey(id, name, avatar, verified)
      `)
      .eq('property_id', propertyId)
      .order('created_at', { ascending: false });

    if (error) throw error;

    res.json({
      success: true,
      data: { reviews }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch reviews' });
  }
});

// Get reviews for a host
router.get('/host/:hostId', async (req: AuthRequest, res: Response) => {
  try {
    const { hostId } = req.params;

    const { data: reviews, error } = await supabase
      .from('reviews')
      .select(`
        *,
        user:users!reviews_user_id_fkey(id, name, avatar, verified),
        property:properties(id, title, image)
      `)
      .eq('host_id', hostId)
      .order('created_at', { ascending: false });

    if (error) throw error;

    res.json({
      success: true,
      data: { reviews }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch reviews' });
  }
});

// Create review
router.post(
  '/',
  authenticateJWT,
  [
    body('property_id').notEmpty(),
    body('host_id').notEmpty(),
    body('rating').isInt({ min: 1, max: 5 }),
    body('comment').trim().isLength({ min: 10, max: 500 })
  ],
  async (req: AuthRequest, res: Response) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({ success: false, errors: errors.array() });
        return;
      }

      const { property_id, host_id, rating, comment } = req.body;

      // Check if user already reviewed this property
      const { data: existing } = await supabase
        .from('reviews')
        .select('id')
        .eq('user_id', req.user!.id)
        .eq('property_id', property_id)
        .single();

      if (existing) {
        res.status(400).json({ success: false, message: 'You have already reviewed this property' });
        return;
      }

      const { data: review, error } = await supabase
        .from('reviews')
        .insert([{
          user_id: req.user!.id,
          property_id,
          host_id,
          rating,
          comment,
          created_at: new Date().toISOString()
        }])
        .select(`
          *,
          user:users!reviews_user_id_fkey(id, name, avatar, verified)
        `)
        .single();

      if (error) throw error;

      // Update host's trust score (average of all reviews)
      const { data: allReviews } = await supabase
        .from('reviews')
        .select('rating')
        .eq('host_id', host_id);

      if (allReviews && allReviews.length > 0) {
        const avgRating = allReviews.reduce((sum, r) => sum + r.rating, 0) / allReviews.length;
        await supabase
          .from('users')
          .update({ trust_score: avgRating })
          .eq('id', host_id);
      }

      res.status(201).json({
        success: true,
        message: 'Review submitted successfully',
        data: { review }
      });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Failed to submit review' });
    }
  }
);

export default router;
