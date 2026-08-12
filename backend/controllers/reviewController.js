import Review from '../models/Review.js';
import Product from '../models/Product.js';

// @desc    Get reviews for a product
// @route   GET /api/reviews/product/:productId
export const getProductReviews = async (req, res) => {
  try {
    const reviews = await Review.find({
      product: req.params.productId,
      status: 'Approved'
    }).sort({ createdAt: -1 });

    const total = reviews.length;
    const avgRating = total > 0 ? (reviews.reduce((acc, item) => acc + item.rating, 0) / total).toFixed(1) : 4.8;

    res.json({ success: true, count: total, averageRating: Number(avgRating), reviews });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Add product review
// @route   POST /api/reviews/product/:productId
export const createProductReview = async (req, res) => {
  try {
    const { rating, title, comment, images } = req.body;
    const product = await Product.findById(req.params.productId);

    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    const review = await Review.create({
      product: req.params.productId,
      user: req.user._id,
      userName: req.user.name,
      rating: Number(rating),
      title: title || '',
      comment,
      images: images || [],
      status: 'Approved' // Auto-approve for demo
    });

    // Update product rating summary
    const allReviews = await Review.find({ product: req.params.productId, status: 'Approved' });
    product.numReviews = allReviews.length;
    product.rating = Number((allReviews.reduce((acc, item) => item.rating + acc, 0) / allReviews.length).toFixed(1));
    await product.save();

    res.status(201).json({ success: true, review });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Get all reviews (Admin moderation)
// @route   GET /api/reviews
export const getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find({}).populate('product', 'name images').sort({ createdAt: -1 });
    res.json({ success: true, reviews });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update review status (Admin moderation)
// @route   PUT /api/reviews/:id/status
export const updateReviewStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const review = await Review.findByIdAndUpdate(req.params.id, { status }, { new: true });
    res.json({ success: true, review });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
