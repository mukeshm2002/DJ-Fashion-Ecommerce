import Product from '../models/Product.js';

// @desc    Get all products with filtering, sorting and search
// @route   GET /api/products
export const getProducts = async (req, res) => {
  try {
    const { category, collection, size, color, minPrice, maxPrice, search, sort, status, tag, featured } = req.query;

    let query = {};

    // Filter by active status for customer endpoints unless requested by admin
    if (status) {
      query.status = status;
    } else {
      query.status = { $in: ['Active', 'Out of Stock'] };
    }

    if (category) query.category = { $regex: new RegExp(`^${category}$`, 'i') };
    if (collection) query.collectionName = { $regex: new RegExp(`^${collection}$`, 'i') };
    if (size) query.sizes = { $in: [size] };
    if (color) query['colors.name'] = { $regex: new RegExp(`^${color}$`, 'i') };
    if (tag) query.tags = { $in: [tag] };

    if (featured === 'new') query.isNewArrival = true;
    if (featured === 'bestseller') query.isBestSeller = true;
    if (featured === 'trending') query.isTrending = true;

    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { category: { $regex: search, $options: 'i' } },
        { tags: { $regex: search, $options: 'i' } },
      ];
    }

    // Sort order
    let sortOption = { createdAt: -1 };
    if (sort === 'newest') sortOption = { createdAt: -1 };
    if (sort === 'price-low') sortOption = { price: 1 };
    if (sort === 'price-high') sortOption = { price: -1 };
    if (sort === 'rating') sortOption = { rating: -1 };
    if (sort === 'bestselling') sortOption = { numReviews: -1, rating: -1 };

    const products = await Product.find(query).sort(sortOption);
    res.json({ success: true, count: products.length, products });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get product by slug or ID
// @route   GET /api/products/:identifier
export const getProductByIdentifier = async (req, res) => {
  try {
    const { identifier } = req.params;
    let product;

    if (identifier.match(/^[0-9a-fA-F]{24}$/)) {
      product = await Product.findById(identifier);
    } else {
      product = await Product.findOne({ slug: identifier });
    }

    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    // Fetch related products ("Complete the Look")
    const relatedProducts = await Product.find({
      category: product.category,
      _id: { $ne: product._id },
      status: 'Active'
    }).limit(4);

    res.json({ success: true, product, relatedProducts });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Create a new product (Admin)
// @route   POST /api/products
export const createProduct = async (req, res) => {
  try {
    const slug = req.body.slug || req.body.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    const productData = {
      ...req.body,
      slug,
      sku: req.body.sku || `YAN-${Math.floor(1000 + Math.random() * 9000)}`
    };

    const product = await Product.create(productData);
    res.status(201).json({ success: true, product });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Update a product (Admin)
// @route   PUT /api/products/:id
export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    res.json({ success: true, product });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Delete a product (Admin)
// @route   DELETE /api/products/:id
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    res.json({ success: true, message: 'Product removed' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
