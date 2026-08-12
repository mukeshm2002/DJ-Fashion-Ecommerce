import mongoose from 'mongoose';

const bannerSchema = new mongoose.Schema({
  title: { type: String, required: true },
  subtitle: { type: String, default: '' },
  badgeText: { type: String, default: 'NEW COLLECTION' },
  ctaText: { type: String, default: 'EXPLORE NOW' },
  ctaLink: { type: String, default: '/shop' },
  imageUrl: { type: String, required: true },
  mobileImageUrl: { type: String, default: '' },
  position: { type: String, enum: ['HERO', 'PROMO', 'MID_BANNER', 'FOOTER_PROMO'], default: 'HERO' },
  isActive: { type: Boolean, default: true },
  order: { type: Number, default: 0 }
}, { timestamps: true });

export default mongoose.model('Banner', bannerSchema);
