import { Router } from 'express';
import { getUsers, getUser } from '../controllers/userController';
import { authenticate } from '../middleware/security';

const router = Router();

router.use(authenticate);

router.get('/', getUsers);
router.get('/:id', getUser);

export default router;
