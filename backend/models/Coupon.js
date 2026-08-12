import mongoose from 'mongoose';

const couponSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true, uppercase: true, trim: true },
  discountType: { type: String, enum: ['PERCENTAGE', 'FIXED', 'FREE_SHIPPING'], required: true },
  discountValue: { type: Number, required: true }, // e.g. 10 for 10% or 200 for ₹200
  minOrderAmount: { type: Number, default: 0 },
  maxDiscountAmount: { type: Number, default: 0 }, // For percentage caps
  startDate: { type: Date, default: Date.now },
  endDate: { type: Date },
  usageLimit: { type: Number, default: 1000 },
  usedCount: { type: Number, default: 0 },
  perCustomerLimit: { type: Number, default: 1 },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

export default mongoose.model('Coupon', couponSchema);
