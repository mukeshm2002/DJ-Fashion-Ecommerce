import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import { seedDatabase } from './utils/seed.js';

import authRoutes from './routes/authRoutes.js';
import productRoutes from './routes/productRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import couponRoutes from './routes/couponRoutes.js';
import campaignRoutes from './routes/campaignRoutes.js';
import reviewRoutes from './routes/reviewRoutes.js';
import contentRoutes from './routes/contentRoutes.js';
import analyticsRoutes from './routes/analyticsRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Production-ready CORS configuration
const allowedOrigins = process.env.FRONTEND_URL
  ? [process.env.FRONTEND_URL, 'http://localhost:3000', 'http://localhost:5000']
  : '*';

app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));

app.use(express.json({ limit: '10mb' }));

// Health Check Endpoint for Render Monitoring
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'DJ Backend',
    brand: 'DJ Fashion D2C',
    location: 'Tiruppur, Tamil Nadu, India',
    timestamp: new Date().toISOString()
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/coupons', couponRoutes);
app.use('/api/campaigns', campaignRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/content', contentRoutes);
app.use('/api/admin/analytics', analyticsRoutes);

// Global Error Handler Middleware (Clean Production Responses)
app.use((err, req, res, next) => {
  console.error('API Error:', err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error'
  });
});

// Connect DB, Seed data, and Start Server
connectDB().then(async () => {
  await seedDatabase();
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`DJ Fashion Backend running on port ${PORT}`);
  });
});
