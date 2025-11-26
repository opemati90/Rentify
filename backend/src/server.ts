import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Import routes
import authRoutes from './routes/auth.routes';
import propertyRoutes from './routes/property.routes';
import userRoutes from './routes/user.routes';
import messageRoutes from './routes/message.routes';
import reviewRoutes from './routes/review.routes';
import adminRoutes from './routes/admin.routes';

const app: Application = express();
const PORT = process.env.PORT || 3000;

// Security middleware
app.use(helmet());
app.use(compression());

// CORS configuration
const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:3001'];
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
} else {
  app.use(morgan('combined'));
}

// Rate limiting
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000'), // 15 minutes
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100'),
  message: 'Too many requests from this IP, please try again later.'
});
app.use('/api/', limiter);

// Health check endpoint
app.get('/health', (_req: Request, res: Response) => {
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/properties', propertyRoutes);
app.use('/api/users', userRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/admin', adminRoutes);

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
    path: req.path
  });
});

// Error handling middleware
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error('Error:', err);

  res.status(500).json({
    success: false,
    message: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`
╔═══════════════════════════════════════════╗
║                                           ║
║   🏠 Rentify API Server                   ║
║                                           ║
║   Environment: ${process.env.NODE_ENV?.padEnd(25) || 'development'.padEnd(25)} ║
║   Port: ${PORT.toString().padEnd(32)} ║
║   Status: Running ✓                      ║
║                                           ║
╚═══════════════════════════════════════════╝
  `);
});

export default app;
