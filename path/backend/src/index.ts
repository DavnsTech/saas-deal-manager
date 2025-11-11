import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/dealmanager')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes would be added here in a real implementation

app.get('/', (req, res) => {
  res.json({ message: 'Deal Manager API' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
