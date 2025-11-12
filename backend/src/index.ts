import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { createConnection } from 'typeorm';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes';
import dealRoutes from './routes/dealRoutes';
import userRoutes from './routes/userRoutes';
import { securityMiddleware } from './middleware/security';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
}));

// Security middleware
app.use(securityMiddleware);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/deals', dealRoutes);
app.use('/api/users', userRoutes);

// Database connection
createConnection().then(() => {
  console.log('Connected to database');
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}).catch(error => console.log(error));
