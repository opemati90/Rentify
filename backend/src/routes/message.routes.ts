import express, { Router, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { supabase } from '../config/database';
import { AuthRequest, authenticateJWT } from '../middleware/auth.middleware';

const router: Router = express.Router();

// Get all conversations for user
router.get('/conversations', authenticateJWT, async (req: AuthRequest, res: Response) => {
  try {
    const { data: conversations, error } = await supabase
      .from('messages')
      .select(`
        *,
        sender:users!messages_sender_id_fkey(id, name, avatar),
        receiver:users!messages_receiver_id_fkey(id, name, avatar),
        property:properties(id, title, image)
      `)
      .or(`sender_id.eq.${req.user!.id},receiver_id.eq.${req.user!.id}`)
      .order('created_at', { ascending: false });

    if (error) throw error;

    // Group by conversation
    const grouped = conversations?.reduce((acc: any, msg) => {
      const otherUserId = msg.sender_id === req.user!.id ? msg.receiver_id : msg.sender_id;
      const key = `${msg.property_id}-${otherUserId}`;

      if (!acc[key] || new Date(msg.created_at) > new Date(acc[key].created_at)) {
        acc[key] = msg;
      }
      return acc;
    }, {});

    res.json({
      success: true,
      data: { conversations: Object.values(grouped || {}) }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch conversations' });
  }
});

// Get messages for a specific conversation
router.get(
  '/conversation/:propertyId/:userId',
  authenticateJWT,
  async (req: AuthRequest, res: Response) => {
    try {
      const { propertyId, userId } = req.params;

      const { data: messages, error } = await supabase
        .from('messages')
        .select(`
          *,
          sender:users!messages_sender_id_fkey(id, name, avatar),
          receiver:users!messages_receiver_id_fkey(id, name, avatar)
        `)
        .eq('property_id', propertyId)
        .or(`and(sender_id.eq.${req.user!.id},receiver_id.eq.${userId}),and(sender_id.eq.${userId},receiver_id.eq.${req.user!.id})`)
        .order('created_at', { ascending: true });

      if (error) throw error;

      // Mark messages as read
      await supabase
        .from('messages')
        .update({ read: true })
        .eq('receiver_id', req.user!.id)
        .eq('sender_id', userId)
        .eq('property_id', propertyId);

      res.json({
        success: true,
        data: { messages }
      });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Failed to fetch messages' });
    }
  }
);

// Send message
router.post(
  '/',
  authenticateJWT,
  [
    body('receiver_id').notEmpty(),
    body('property_id').notEmpty(),
    body('content').trim().isLength({ min: 1 })
  ],
  async (req: AuthRequest, res: Response) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({ success: false, errors: errors.array() });
        return;
      }

      const { receiver_id, property_id, content } = req.body;

      const { data: message, error } = await supabase
        .from('messages')
        .insert([{
          sender_id: req.user!.id,
          receiver_id,
          property_id,
          content,
          read: false,
          created_at: new Date().toISOString()
        }])
        .select(`
          *,
          sender:users!messages_sender_id_fkey(id, name, avatar),
          receiver:users!messages_receiver_id_fkey(id, name, avatar)
        `)
        .single();

      if (error) throw error;

      res.status(201).json({
        success: true,
        message: 'Message sent successfully',
        data: { message }
      });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Failed to send message' });
    }
  }
);

// Mark messages as read
router.put('/:id/read', authenticateJWT, async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    const { error } = await supabase
      .from('messages')
      .update({ read: true })
      .eq('id', id)
      .eq('receiver_id', req.user!.id);

    if (error) throw error;

    res.json({
      success: true,
      message: 'Message marked as read'
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to update message' });
  }
});

export default router;
