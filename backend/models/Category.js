import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  slug: { type: String, required: true, unique: true, lowercase: true },
  description: { type: String, default: '' },
  image: { type: String, default: '' },
  featured: { type: Boolean, default: true },
  itemCount: { type: Number, default: 0 },
}, { timestamps: true });

export default mongoose.model('Category', categorySchema);
