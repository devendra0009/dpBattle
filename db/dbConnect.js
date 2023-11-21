import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const DB_URI = process.env.DB_URI;
// console.log(DB_URI);
export const dbConnect = async () => {
  try {
    await mongoose.connect(DB_URI);
    console.log('Database connected!');
  } catch (error) {
    console.error('Error connecting to the database:', error);
  }
};
