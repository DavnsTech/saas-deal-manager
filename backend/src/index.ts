import express, { Express, Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import dealRoutes from './routes/dealRoutes';

dotenv.config(); // Load environment variables from .env file

const app: Express = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json()); // Parse JSON bodies (redundant if body-parser is used per route, but good for general use)
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Routes
app.use('/api/deals', dealRoutes);

// Basic Health Check Route
app.get('/', (req: Request, res: Response) => {
    res.send('Deal Manager Backend is running!');
});

// Global Error Handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error('Unhandled Error:', err.message);
    // Check if it's a custom error with a specific status code, otherwise default to 500
    const statusCode = (err as any).statusCode || 500;
    res.status(statusCode).json({
        message: err.message || 'Internal Server Error',
        // In development, you might want to send more details
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
