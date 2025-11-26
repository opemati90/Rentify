import express, { Router, Response } from 'express';
import { body, validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { supabase } from '../config/database';
import { AuthRequest, authenticateJWT } from '../middleware/auth.middleware';

const router: Router = express.Router();

// Register new user
router.post(
  '/register',
  [
    body('email').isEmail().normalizeEmail(),
    body('password').isLength({ min: 6 }),
    body('name').trim().isLength({ min: 2 }),
    body('phone').optional().isMobilePhone('any')
  ],
  async (req: AuthRequest, res: Response) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({ success: false, errors: errors.array() });
        return;
      }

      const { email, password, name, phone } = req.body;

      // Check if user exists
      const { data: existingUser } = await supabase
        .from('users')
        .select('id')
        .eq('email', email)
        .single();

      if (existingUser) {
        res.status(400).json({ success: false, message: 'User already exists' });
        return;
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create user
      const { data: newUser, error } = await supabase
        .from('users')
        .insert([{
          email,
          password: hashedPassword,
          name,
          phone,
          role: 'renter',
          verified: false,
          trust_score: 0,
          created_at: new Date().toISOString()
        }])
        .select()
        .single();

      if (error) throw error;

      // Generate JWT token
      const jwtSecret = process.env.JWT_SECRET || 'default-secret-key';
      const token = jwt.sign(
        { id: newUser.id, email: newUser.email, role: newUser.role },
        jwtSecret,
        { expiresIn: '7d' }
      );

      res.status(201).json({
        success: true,
        message: 'User registered successfully',
        data: {
          user: {
            id: newUser.id,
            email: newUser.email,
            name: newUser.name,
            role: newUser.role
          },
          token
        }
      });
    } catch (error) {
      console.error('Registration error:', error);
      res.status(500).json({ success: false, message: 'Registration failed' });
    }
  }
);

// Login user
router.post(
  '/login',
  [
    body('email').isEmail().normalizeEmail(),
    body('password').exists()
  ],
  async (req: AuthRequest, res: Response) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({ success: false, errors: errors.array() });
        return;
      }

      const { email, password } = req.body;

      // Find user
      const { data: user, error } = await supabase
        .from('users')
        .select('*')
        .eq('email', email)
        .single();

      if (error || !user) {
        res.status(401).json({ success: false, message: 'Invalid credentials' });
        return;
      }

      // Verify password
      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        res.status(401).json({ success: false, message: 'Invalid credentials' });
        return;
      }

      // Generate JWT token
      const jwtSecret = process.env.JWT_SECRET || 'default-secret-key';
      const token = jwt.sign(
        { id: user.id, email: user.email, role: user.role },
        jwtSecret,
        { expiresIn: '7d' }
      );

      res.json({
        success: true,
        message: 'Login successful',
        data: {
          user: {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
            verified: user.verified,
            trust_score: user.trust_score
          },
          token
        }
      });
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ success: false, message: 'Login failed' });
    }
  }
);

// Get current user
router.get('/me', authenticateJWT, async (req: AuthRequest, res: Response) => {
  try {
    const { data: user, error } = await supabase
      .from('users')
      .select('id, email, name, phone, role, verified, trust_score, avatar, created_at')
      .eq('id', req.user!.id)
      .single();

    if (error) throw error;

    res.json({
      success: true,
      data: { user }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch user' });
  }
});

// Request password reset
router.post(
  '/forgot-password',
  [body('email').isEmail().normalizeEmail()],
  async (req: AuthRequest, res: Response) => {
    try {
      const { email } = req.body;

      // Generate reset token (in production, send via email)
      const resetToken = jwt.sign(
        { email },
        process.env.JWT_SECRET as string,
        { expiresIn: '1h' }
      );

      res.json({
        success: true,
        message: 'Password reset email sent',
        ...(process.env.NODE_ENV === 'development' && { resetToken })
      });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Failed to process request' });
    }
  }
);

export default router;
