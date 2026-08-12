import express from 'express';
import { getBanners, getAllBannersAdmin, createBanner, updateBanner } from '../controllers/contentController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/banners', getBanners);
router.get('/admin/banners', protect, adminOnly, getAllBannersAdmin);
router.post('/banners', protect, adminOnly, createBanner);
router.put('/banners/:id', protect, adminOnly, updateBanner);

export default router;
