import { Router } from 'express';
import { authenticateToken } from '../middleware/security';
import { getCurrentUser, getUserDeals } from '../controllers/userController';

const router = Router();

// Protect all user routes
router.use(authenticateToken);

router.get('/me', getCurrentUser);
router.get('/me/deals', getUserDeals); // Get deals for the currently authenticated user

export default router;
