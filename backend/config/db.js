import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

let mongoMemoryServer = null;

export const connectDB = async () => {
  const isProduction = process.env.NODE_ENV === 'production';
  const dbUrlExists = Boolean(process.env.DATABASE_URL);
  const isSrvFormat = dbUrlExists && process.env.DATABASE_URL.trim().startsWith('mongodb+srv://');

  // Safe diagnostic log (NEVER logs URI, credentials, or passwords)
  console.log(`[DB Config Audit] NODE_ENV: ${process.env.NODE_ENV || 'development'}`);
  console.log(`[DB Config Audit] DATABASE_URL configured: ${dbUrlExists}`);
  console.log(`[DB Config Audit] DATABASE_URL starts with mongodb+srv://: ${isSrvFormat}`);

  // PRODUCTION MODE: Must connect to MongoDB Atlas directly
  if (isProduction) {
    if (!dbUrlExists) {
      console.error('[DB FATAL ERROR] DATABASE_URL environment variable is MISSING on Render in production mode!');
      console.error('[DB FATAL ERROR] Please set DATABASE_URL in your Render Web Service Environment settings.');
      process.exit(1);
    }

    try {
      const conn = await mongoose.connect(process.env.DATABASE_URL);
      console.log(`[DB SUCCESS] MongoDB Atlas connected successfully to cluster host: ${conn.connection.host}`);
    } catch (error) {
      console.error('[DB FATAL ERROR] MongoDB Atlas connection failed:', error.message);
      process.exit(1);
    }
    return;
  }

  // LOCAL DEVELOPMENT MODE: Standard connection with local/in-memory fallback
  try {
    const mongoUri = process.env.DATABASE_URL || 'mongodb://127.0.0.1:27017/dj_fashion';
    const conn = await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 2000,
    });
    console.log(`[DB DEV] Standard MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.warn(`[DB DEV] Standard MongoDB connection failed (${error.message}). Spinning up MongoMemoryServer fallback for local testing...`);
    try {
      const { MongoMemoryServer } = await import('mongodb-memory-server');
      mongoMemoryServer = await MongoMemoryServer.create();
      const memoryUri = mongoMemoryServer.getUri();
      const conn = await mongoose.connect(memoryUri);
      console.log(`[DB DEV] InMemory MongoDB Connected: ${conn.connection.host}`);
    } catch (fallbackErr) {
      console.error('[DB DEV FATAL] MongoDB Memory Server Failed:', fallbackErr.message);
      process.exit(1);
    }
  }
};
