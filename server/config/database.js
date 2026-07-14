import mongoose from 'mongoose';

const connectDB = async () => {
  const mongoUri = process.env.MONGODB_URI || process.env.MONGODB_URL;

  if (!mongoUri) {
    throw new Error(
      'Missing MongoDB connection string. Set MONGODB_URI in server/.env.'
    );
  }

  await mongoose.connect(mongoUri);
  console.log('MongoDB connected successfully!');
  return true;
};

export default connectDB;
