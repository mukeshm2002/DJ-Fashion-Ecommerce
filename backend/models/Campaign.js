import mongoose from 'mongoose';

const campaignSchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  type: { type: String, enum: ['Awareness', 'Traffic', 'Engagement', 'Sales', 'Retargeting'], default: 'Sales' },
  targetCategory: { type: String, default: '' },
  targetProductId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  headline: { type: String, required: true },
  subheadline: { type: String, default: '' },
  heroImage: { type: String, default: '' },
  ctaText: { type: String, default: 'SHOP THE COLLECTION' },
  ctaLink: { type: String, default: '/shop' },
  discountCode: { type: String, default: '' },
  startDate: { type: Date, default: Date.now },
  endDate: { type: Date },
  budget: { type: Number, default: 5000 },
  spent: { type: Number, default: 0 },
  status: { type: String, enum: ['Draft', 'Active', 'Paused', 'Completed'], default: 'Active' },
  metaPixelId: { type: String, default: 'PX-9842014-YAN' },
  conversionApiEndpoint: { type: String, default: '/api/analytics/meta-capi' },
  utmSource: { type: String, default: 'meta_ads' },
  utmMedium: { type: String, default: 'cpc' },
  utmCampaign: { type: String, default: 'summer_d2c_launch' },
  impressions: { type: Number, default: 12450 },
  clicks: { type: Number, default: 1820 },
  conversions: { type: Number, default: 142 },
  revenue: { type: Number, default: 284000 }
}, { timestamps: true });

export default mongoose.model('Campaign', campaignSchema);
