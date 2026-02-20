import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    // await mongoose.connect(process.env.MONGO_URI);
    // console.log('MongoDB connected');
    return;
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    process.exit(1);
  }
};

export default connectDB;