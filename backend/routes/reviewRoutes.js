import express from 'express';
import { getProductReviews, createProductReview, getAllReviews, updateReviewStatus } from '../controllers/reviewController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/product/:productId', getProductReviews);
router.post('/product/:productId', protect, createProductReview);
router.get('/', protect, adminOnly, getAllReviews);
router.put('/:id/status', protect, adminOnly, updateReviewStatus);

export default router;
