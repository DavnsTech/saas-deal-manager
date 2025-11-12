import { Router } from 'express';
import { getUsers, getUser } from '../controllers/userController';
import { authenticateToken } from '../middleware/security';

const router = Router();

router.use(authenticateToken);

router.get('/', getUsers);
router.get('/:id', getUser);

export default router;
