import { Router } from 'express';
import { getProfile } from '../controllers/userController';
import { authMiddleware } from '../middleware/security';

const router = Router();

router.use(authMiddleware); // All user routes require auth

router.get('/profile', getProfile);

export default router;
