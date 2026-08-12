import Campaign from '../models/Campaign.js';

// @desc    Get public campaign by slug
// @route   GET /api/campaigns/slug/:slug
export const getCampaignBySlug = async (req, res) => {
  try {
    const campaign = await Campaign.findOne({ slug: req.params.slug, status: 'Active' });
    if (!campaign) {
      return res.status(404).json({ success: false, message: 'Campaign not found or inactive' });
    }
    res.json({ success: true, campaign });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get all campaigns (Admin)
// @route   GET /api/campaigns
export const getAllCampaigns = async (req, res) => {
  try {
    const campaigns = await Campaign.find({}).sort({ createdAt: -1 });
    res.json({ success: true, campaigns });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Create campaign (Admin)
// @route   POST /api/campaigns
export const createCampaign = async (req, res) => {
  try {
    const slug = req.body.slug || req.body.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const campaign = await Campaign.create({ ...req.body, slug });
    res.status(201).json({ success: true, campaign });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Update campaign (Admin)
// @route   PUT /api/campaigns/:id
export const updateCampaign = async (req, res) => {
  try {
    const campaign = await Campaign.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ success: true, campaign });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
