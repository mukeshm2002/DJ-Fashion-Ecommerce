import express from 'express';
import { getAnalyticsOverview, getMarketingCaseStudy } from '../controllers/analyticsController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/overview', protect, adminOnly, getAnalyticsOverview);
router.get('/marketing-roadmap', protect, adminOnly, getMarketingCaseStudy);

export default router;
