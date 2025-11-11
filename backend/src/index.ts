import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes';
import dealRoutes from './routes/dealRoutes';
import userRoutes from './routes/userRoutes'; // Import user routes
import cors from 'cors'; // Import cors

dotenv.config(); // Load environment variables from .env file

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Enable CORS for all origins - configure in production
app.use(express.json()); // Parse JSON request bodies

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/deals', dealRoutes);
app.use('/api/users', userRoutes); // Mount user routes

// Basic root route for testing
app.get('/', (req, res) => {
  res.send('Deal Manager Backend is running!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
