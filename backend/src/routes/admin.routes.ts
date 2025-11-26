import express, { Router, Response } from 'express';
import { supabase } from '../config/database';
import { AuthRequest, authenticateJWT, requireAdmin } from '../middleware/auth.middleware';

const router: Router = express.Router();

// All admin routes require authentication and admin role
router.use(authenticateJWT, requireAdmin);

// Get dashboard statistics
router.get('/stats', async (_req: AuthRequest, res: Response) => {
  try {
    // Get total users
    const { count: totalUsers } = await supabase
      .from('users')
      .select('*', { count: 'exact', head: true });

    // Get active users (logged in last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const { count: activeUsers } = await supabase
      .from('users')
      .select('*', { count: 'exact', head: true })
      .gte('last_login', thirtyDaysAgo.toISOString());

    // Get properties by status
    const { data: properties } = await supabase
      .from('properties')
      .select('status');

    const propertyStats = properties?.reduce((acc: any, p) => {
      acc[p.status] = (acc[p.status] || 0) + 1;
      return acc;
    }, {});

    // Get pending verifications
    const { count: pendingVerifications } = await supabase
      .from('users')
      .select('*', { count: 'exact', head: true })
      .eq('verified', false);

    res.json({
      success: true,
      data: {
        users: {
          total: totalUsers || 0,
          active: activeUsers || 0,
          pendingVerifications: pendingVerifications || 0
        },
        properties: {
          total: properties?.length || 0,
          pending: propertyStats?.pending || 0,
          approved: propertyStats?.approved || 0,
          rejected: propertyStats?.rejected || 0
        }
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch stats' });
  }
});

// Get all users with pagination
router.get('/users', async (req: AuthRequest, res: Response) => {
  try {
    const { page = 1, limit = 20, status } = req.query;

    let query = supabase.from('users').select('*', { count: 'exact' });

    if (status === 'pending') {
      query = query.eq('verified', false);
    } else if (status === 'verified') {
      query = query.eq('verified', true);
    }

    const offset = (Number(page) - 1) * Number(limit);
    const { data: users, error, count } = await query
      .range(offset, offset + Number(limit) - 1)
      .order('created_at', { ascending: false });

    if (error) throw error;

    res.json({
      success: true,
      data: {
        users,
        pagination: {
          page: Number(page),
          limit: Number(limit),
          total: count
        }
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch users' });
  }
});

// Verify user
router.put('/users/:id/verify', async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    const { data: user, error } = await supabase
      .from('users')
      .update({ verified: true })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    res.json({
      success: true,
      message: 'User verified successfully',
      data: { user }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to verify user' });
  }
});

// Get pending properties
router.get('/properties/pending', async (_req: AuthRequest, res: Response) => {
  try {
    const { data: properties, error } = await supabase
      .from('properties')
      .select(`
        *,
        host:users!properties_host_id_fkey(id, name, email, verified)
      `)
      .eq('status', 'pending')
      .order('created_at', { ascending: false });

    if (error) throw error;

    res.json({
      success: true,
      data: { properties }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch pending properties' });
  }
});

// Approve property
router.put('/properties/:id/approve', async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    const { data: property, error } = await supabase
      .from('properties')
      .update({ status: 'approved' })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    res.json({
      success: true,
      message: 'Property approved successfully',
      data: { property }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to approve property' });
  }
});

// Reject property
router.put('/properties/:id/reject', async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { reason } = req.body;

    const { data: property, error } = await supabase
      .from('properties')
      .update({
        status: 'rejected',
        rejection_reason: reason
      })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    res.json({
      success: true,
      message: 'Property rejected',
      data: { property }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to reject property' });
  }
});

// Get analytics data
router.get('/analytics', async (_req: AuthRequest, res: Response) => {
  try {
    // Get user growth (last 30 days)
    const userGrowth = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i * 7);
      const { count } = await supabase
        .from('users')
        .select('*', { count: 'exact', head: true })
        .lte('created_at', date.toISOString());
      userGrowth.push(count || 0);
    }

    // Get property growth
    const propertyGrowth = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i * 7);
      const { count } = await supabase
        .from('properties')
        .select('*', { count: 'exact', head: true })
        .lte('created_at', date.toISOString());
      propertyGrowth.push(count || 0);
    }

    res.json({
      success: true,
      data: {
        userGrowth,
        propertyGrowth,
        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6', 'Week 7']
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch analytics' });
  }
});

export default router;
