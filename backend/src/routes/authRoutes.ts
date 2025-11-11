import { Router } from 'express';
import { register, login, getProfile } from '../controllers/authController';
import { authenticateToken } from '../middleware/security';
import { body } from 'express-validator';

const router = Router();

// Registration route with validation
router.post(
    '/register',
    [
        body('email', 'Invalid email').isEmail(),
        body('password', 'Password must be at least 6 characters long').isLength({ min: 6 }),
        body('name', 'Name is required').notEmpty(), // Assuming name is required
    ],
    register
);

// Login route with validation
router.post(
    '/login',
    [
        body('email', 'Invalid email').isEmail(),
        body('password', 'Password is required').notEmpty(),
    ],
    login
);

// Protected route example
router.get('/profile', authenticateToken, getProfile);

export default router;
