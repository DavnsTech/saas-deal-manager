import { Router } from 'express';
import { getDeals, createDeal, getDealById, updateDeal, deleteDeal } from '../controllers/dealController';
import { authMiddleware } from '../middleware/security';

const router = Router();

router.use(authMiddleware); // All deal routes require auth

router.get('/', getDeals);
router.post('/', createDeal);
router.get('/:id', getDealById);
router.put('/:id', updateDeal);
router.delete('/:id', deleteDeal);

export default router;
