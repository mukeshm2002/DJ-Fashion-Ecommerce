import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { connectDB } from '../config/db.js';
import User from '../models/User.js';
import Product from '../models/Product.js';
import Category from '../models/Category.js';
import Coupon from '../models/Coupon.js';
import Campaign from '../models/Campaign.js';
import Banner from '../models/Banner.js';
import Review from '../models/Review.js';
import { INITIAL_CATEGORIES, INITIAL_PRODUCTS, INITIAL_COUPONS, INITIAL_CAMPAIGNS } from './seedData.js';

dotenv.config();

export const seedDatabase = async () => {
  try {
    console.log('Seeding initial DJ data...');

    // Seed Categories if empty
    const catCount = await Category.countDocuments();
    if (catCount === 0) {
      await Category.insertMany(INITIAL_CATEGORIES);
      console.log('Categories seeded successfully.');
    }

    // Seed Products if empty
    const prodCount = await Product.countDocuments();
    if (prodCount === 0) {
      await Product.insertMany(INITIAL_PRODUCTS);
      console.log(`${INITIAL_PRODUCTS.length} Products seeded successfully.`);
    }

    // Seed Coupons if empty
    const couponCount = await Coupon.countDocuments();
    if (couponCount === 0) {
      await Coupon.insertMany(INITIAL_COUPONS);
      console.log('Coupons seeded successfully.');
    }

    // Seed Campaigns if empty
    const campaignCount = await Campaign.countDocuments();
    if (campaignCount === 0) {
      await Campaign.insertMany(INITIAL_CAMPAIGNS);
      console.log('Campaigns seeded successfully.');
    }

    // Seed Banners if empty
    const bannerCount = await Banner.countDocuments();
    if (bannerCount === 0) {
      await Banner.create([
        {
          title: "Style That Feels Like You.",
          subtitle: "Discover thoughtfully curated fashion designed for your everyday confidence.",
          badgeText: "NEW ARRIVALS 2026",
          ctaText: "SHOP NEW ARRIVALS",
          ctaLink: "/shop",
          imageUrl: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1600&auto=format&fit=crop",
          position: "HERO",
          isActive: true
        }
      ]);
    }

    // Ensure Admin & Demo Customer User Accounts Exist
    const adminExists = await User.findOne({ email: 'admin@djfashion.com' });
    if (!adminExists) {
      await User.create({
        name: 'DJ Admin',
        email: 'admin@djfashion.com',
        password: 'admin123',
        role: 'ADMIN',
        phone: '+91 98765 00000'
      });
      console.log('Admin account created (admin@djfashion.com / admin123)');
    }

    const customerExists = await User.findOne({ email: 'customer@djfashion.com' });
    if (!customerExists) {
      await User.create({
        name: 'Ananya Sharma',
        email: 'customer@djfashion.com',
        password: 'customer123',
        role: 'CUSTOMER',
        phone: '+91 98765 11111',
        addresses: [
          {
            name: 'Ananya Sharma',
            phone: '+91 98765 11111',
            street: '402 Sunrise Heights, Indiranagar',
            city: 'Bengaluru',
            state: 'Karnataka',
            pincode: '560038',
            isDefault: true
          }
        ]
      });
      console.log('Demo Customer account created (customer@djfashion.com / customer123)');
    }

    console.log('DJ Database seeding complete!');
  } catch (error) {
    console.error('Database seeding failed:', error.message);
  }
};
