import mongoose from 'mongoose';
import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

export const connectMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('🟢 MongoDB Connected Successfully!');
  } catch (error) {
    console.error('❌ MongoDB Connection Error:', error);
    process.exit(1);
  }
};

export const sequelize = new Sequelize(
  process.env.SQL_DB_NAME,
  process.env.SQL_USER,
  process.env.SQL_PASSWORD,
  {
    host: process.env.SQL_HOST,
    dialect: process.env.SQL_DIALECT,
    logging: false,
  }
);

export const connectSQL = async () => {
  try {
    await sequelize.authenticate();
    console.log('🔵 SQL Database Connected Successfully!');
  } catch (error) {
    console.error('❌ SQL Connection Error:', error);
    process.exit(1);
  }
};