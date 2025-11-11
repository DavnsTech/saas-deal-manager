import { Router } from 'express';
import { getCurrentUser, getAllUsers } from '../controllers/userController';
import { authenticateToken, authorizeRole } from '../middleware/security';

const router = Router();

router.get('/me', authenticateToken, getCurrentUser);
router.get('/', authenticateToken, authorizeRole(['admin']), getAllUsers); // Only admins can see all users

export default router;
