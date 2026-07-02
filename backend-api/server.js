import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes.js';
import { connectMongoDB, connectSQL } from './config/db.js';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;


const startServer = async () => {
  await connectSQL();
  await connectMongoDB();
  
  app.listen(PORT, () => {
    console.log(`🚀 Backend Server is running on http://localhost:${PORT}`);
  });
};

startServer();