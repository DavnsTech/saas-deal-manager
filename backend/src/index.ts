import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { AppDataSource } from './config/database';
import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes';
import dealRoutes from './routes/dealRoutes';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/deals', dealRoutes);

// Database Connection
AppDataSource.initialize()
  .then(() => {
    console.log('Database connected successfully');
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((error) => console.log('Database connection error:', error));
