import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  slug: { type: String, required: true, unique: true, lowercase: true },
  sku: { type: String, required: true, unique: true },
  category: { type: String, required: true },
  collectionName: { type: String, default: 'General' },
  description: { type: String, required: true },
  fabric: { type: String, default: '100% Premium Cotton' },
  fit: { type: String, default: 'Regular Fit' },
  careInstructions: { type: String, default: 'Machine wash cold, gentle cycle. Line dry in shade.' },
  price: { type: Number, required: true, min: 0 },
  comparePrice: { type: Number, default: 0 },
  discountPercentage: { type: Number, default: 0 },
  stock: { type: Number, required: true, default: 10 },
  lowStockThreshold: { type: Number, default: 5 },
  sizes: [{ type: String }],
  colors: [{
    name: { type: String, required: true },
    hex: { type: String, required: true },
    image: { type: String }
  }],
  images: [{ type: String, required: true }],
  tags: [{ type: String }],
  isNewArrival: { type: Boolean, default: false },
  isBestSeller: { type: Boolean, default: false },
  isTrending: { type: Boolean, default: false },
  status: { type: String, enum: ['Active', 'Draft', 'Out of Stock', 'Archived'], default: 'Active' },
  rating: { type: Number, default: 4.8 },
  numReviews: { type: Number, default: 0 },
  seoTitle: { type: String, default: '' },
  seoDescription: { type: String, default: '' },
}, { timestamps: true });

// Auto-calculate discount percentage if comparePrice > price
productSchema.pre('save', function (next) {
  if (this.comparePrice > this.price) {
    this.discountPercentage = Math.round(((this.comparePrice - this.price) / this.comparePrice) * 100);
  } else {
    this.discountPercentage = 0;
  }
  next();
});

export default mongoose.model('Product', productSchema);
