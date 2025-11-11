import express from 'express';
import { register, login, getProfile, updateProfile } from '../controllers/authController';
import { authenticate } from '../config/jwt';

const router = express.Router();

// Public routes
router.post('/register', register);
router.post('/login', login);

// Protected routes
router.get('/profile', authenticate, getProfile);
router.put('/profile', authenticate, updateProfile);

export default router;
