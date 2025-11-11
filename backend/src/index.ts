import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes';
import dealRoutes from './routes/dealRoutes';

dotenv.config(); // Load environment variables

const app: Express = express();
const port = process.env.PORT || 5000;

// Middlewares
app.use(cors()); // Enable CORS for all origins (configure for production)
app.use(express.json()); // Parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded request bodies

// Basic health check route
app.get('/', (req: Request, res: Response) => {
  res.send('Deal Manager Backend is running!');
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes); // Assuming userRoutes exists for user management
app.use('/api/deals', dealRoutes);

// Basic error handling middleware (example)
app.use((err: Error, req: Request, res: Response, next: Function) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
