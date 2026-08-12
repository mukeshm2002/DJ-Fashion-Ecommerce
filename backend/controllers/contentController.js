import Banner from '../models/Banner.js';

// @desc    Get active banners & CMS content
// @route   GET /api/content/banners
export const getBanners = async (req, res) => {
  try {
    const banners = await Banner.find({ isActive: true }).sort({ order: 1 });
    res.json({ success: true, banners });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get all banners (Admin)
// @route   GET /api/content/admin/banners
export const getAllBannersAdmin = async (req, res) => {
  try {
    const banners = await Banner.find({}).sort({ order: 1 });
    res.json({ success: true, banners });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Create banner (Admin)
// @route   POST /api/content/banners
export const createBanner = async (req, res) => {
  try {
    const banner = await Banner.create(req.body);
    res.status(201).json({ success: true, banner });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Update banner (Admin)
// @route   PUT /api/content/banners/:id
export const updateBanner = async (req, res) => {
  try {
    const banner = await Banner.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ success: true, banner });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
