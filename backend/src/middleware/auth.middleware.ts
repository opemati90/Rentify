import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { verifyFirebaseToken } from '../config/firebase';

export interface AuthRequest extends Request {
  user?: {
    id: string;
    email: string;
    role?: string;
  };
}

// JWT Authentication Middleware
export const authenticateJWT = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).json({
        success: false,
        message: 'No token provided'
      });
      return;
    }

    const token = authHeader.substring(7);

    // Verify JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      id: string;
      email: string;
      role?: string;
    };

    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: 'Invalid or expired token'
    });
  }
};

// Firebase Authentication Middleware
export const authenticateFirebase = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).json({
        success: false,
        message: 'No token provided'
      });
      return;
    }

    const token = authHeader.substring(7);
    const decodedToken = await verifyFirebaseToken(token);

    req.user = {
      id: decodedToken.uid,
      email: decodedToken.email || '',
      role: decodedToken.role as string
    };

    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: 'Invalid Firebase token'
    });
  }
};

// Admin Role Middleware
export const requireAdmin = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void => {
  if (req.user?.role !== 'admin') {
    res.status(403).json({
      success: false,
      message: 'Admin access required'
    });
    return;
  }
  next();
};

// Optional Authentication (doesn't fail if no token)
export const optionalAuth = async (
  req: AuthRequest,
  _res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.substring(7);
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
        id: string;
        email: string;
        role?: string;
      };
      req.user = decoded;
    }
    next();
  } catch (error) {
    // Continue without authentication
    next();
  }
};
