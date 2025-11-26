import express, { Router, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { supabase } from '../config/database';
import { AuthRequest, authenticateJWT, optionalAuth } from '../middleware/auth.middleware';
import { upload, uploadToCloudinary } from '../config/cloudinary';

const router: Router = express.Router();

// Get all properties with filters
router.get('/', optionalAuth, async (req: AuthRequest, res: Response) => {
  try {
    const {
      type,
      minPrice,
      maxPrice,
      bedrooms,
      location,
      featured,
      page = 1,
      limit = 20
    } = req.query;

    let query = supabase
      .from('properties')
      .select(`
        *,
        host:users!properties_host_id_fkey(id, name, avatar, verified, trust_score)
      `)
      .eq('status', 'approved');

    // Apply filters
    if (type) query = query.eq('type', type);
    if (minPrice) query = query.gte('price', Number(minPrice));
    if (maxPrice) query = query.lte('price', Number(maxPrice));
    if (bedrooms) query = query.eq('beds', Number(bedrooms));
    if (location) query = query.ilike('location', `%${location}%`);
    if (featured === 'true') query = query.eq('featured', true);

    // Pagination
    const offset = (Number(page) - 1) * Number(limit);
    query = query.range(offset, offset + Number(limit) - 1);

    const { data: properties, error, count } = await query;

    if (error) throw error;

    res.json({
      success: true,
      data: {
        properties,
        pagination: {
          page: Number(page),
          limit: Number(limit),
          total: count
        }
      }
    });
  } catch (error) {
    console.error('Fetch properties error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch properties' });
  }
});

// Get single property
router.get('/:id', optionalAuth, async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    const { data: property, error } = await supabase
      .from('properties')
      .select(`
        *,
        host:users!properties_host_id_fkey(id, name, avatar, verified, trust_score, response_time),
        reviews(id, rating, comment, user_id, created_at, users(name, avatar, verified))
      `)
      .eq('id', id)
      .single();

    if (error || !property) {
      res.status(404).json({ success: false, message: 'Property not found' });
      return;
    }

    res.json({
      success: true,
      data: { property }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch property' });
  }
});

// Create new property
router.post(
  '/',
  authenticateJWT,
  upload.array('images', 5),
  [
    body('title').trim().isLength({ min: 5 }),
    body('description').trim().isLength({ min: 20 }),
    body('location').trim().notEmpty(),
    body('price').isNumeric(),
    body('type').isIn(['Apartment', 'House', 'Villa', 'Studio', 'Room', 'Duplex']),
    body('beds').isInt({ min: 1 }),
    body('baths').isInt({ min: 1 }),
    body('sqft').isInt({ min: 100 })
  ],
  async (req: AuthRequest, res: Response) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({ success: false, errors: errors.array() });
        return;
      }

      const propertyData = req.body;
      const files = req.files as Express.Multer.File[];

      // Upload images to Cloudinary
      const imageUrls: string[] = [];
      if (files && files.length > 0) {
        for (const file of files) {
          const { url } = await uploadToCloudinary(file.buffer, 'rentify/properties');
          imageUrls.push(url);
        }
      }

      // Create property
      const { data: property, error } = await supabase
        .from('properties')
        .insert([{
          ...propertyData,
          host_id: req.user!.id,
          images: imageUrls,
          image: imageUrls[0] || '',
          status: 'pending', // Requires admin approval
          featured: false,
          created_at: new Date().toISOString()
        }])
        .select()
        .single();

      if (error) throw error;

      res.status(201).json({
        success: true,
        message: 'Property created successfully and pending approval',
        data: { property }
      });
    } catch (error) {
      console.error('Create property error:', error);
      res.status(500).json({ success: false, message: 'Failed to create property' });
    }
  }
);

// Update property
router.put(
  '/:id',
  authenticateJWT,
  async (req: AuthRequest, res: Response) => {
    try {
      const { id } = req.params;

      // Check ownership
      const { data: existing } = await supabase
        .from('properties')
        .select('host_id')
        .eq('id', id)
        .single();

      if (!existing || existing.host_id !== req.user!.id) {
        res.status(403).json({ success: false, message: 'Unauthorized' });
        return;
      }

      const { data: property, error } = await supabase
        .from('properties')
        .update(req.body)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      res.json({
        success: true,
        message: 'Property updated successfully',
        data: { property }
      });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Failed to update property' });
    }
  }
);

// Delete property
router.delete('/:id', authenticateJWT, async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    // Check ownership
    const { data: existing } = await supabase
      .from('properties')
      .select('host_id')
      .eq('id', id)
      .single();

    if (!existing || existing.host_id !== req.user!.id) {
      res.status(403).json({ success: false, message: 'Unauthorized' });
      return;
    }

    const { error } = await supabase
      .from('properties')
      .delete()
      .eq('id', id);

    if (error) throw error;

    res.json({
      success: true,
      message: 'Property deleted successfully'
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to delete property' });
  }
});

export default router;
