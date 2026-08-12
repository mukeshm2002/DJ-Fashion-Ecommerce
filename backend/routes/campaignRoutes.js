import express from 'express';
import { getCampaignBySlug, getAllCampaigns, createCampaign, updateCampaign } from '../controllers/campaignController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/slug/:slug', getCampaignBySlug);
router.get('/', protect, adminOnly, getAllCampaigns);
router.post('/', protect, adminOnly, createCampaign);
router.put('/:id', protect, adminOnly, updateCampaign);

export default router;
