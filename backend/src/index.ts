import express, { Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import dealRoutes from './routes/dealRoutes'; // Assuming routes are modular

// Load environment variables
dotenv.config();

const app: Express = express();
const PORT: number = parseInt(process.env.PORT || '5000', 10);

// Middleware
app.use(cors()); // Enable CORS for all origins (configure as needed for production)
app.use(express.json()); // Parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded request bodies

// Basic logging middleware (example)
app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// Routes
app.use('/api/deals', dealRoutes);

// Health Check Route
app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'healthy', timestamp: new Date().toISOString() });
});

// Global Error Handler Middleware (example)
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error('Unhandled error:', err.stack);
  res.status(500).json({
    message: 'Something went wrong on the server.',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined, // Only show detailed error in dev
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

export default app; // Export for testing
