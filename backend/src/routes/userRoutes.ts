import { Router } from 'express';
import { getProfile } from '../controllers/userController';
import { authenticateToken } from '../middleware/security';

const router = Router();

router.get('/profile', authenticateToken, getProfile);

export { router as userRoutes };
