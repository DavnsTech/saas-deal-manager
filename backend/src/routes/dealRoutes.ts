import { Router } from 'express';
import { getDeals, getDealById, createDeal, updateDeal, deleteDeal } from '../controllers/dealController';
import { authenticateToken } from '../middleware/security';

const router = Router();

router.get('/', authenticateToken, getDeals);
router.get('/:id', authenticateToken, getDealById);
router.post('/', authenticateToken, createDeal);
router.put('/:id', authenticateToken, updateDeal);
router.delete('/:id', authenticateToken, deleteDeal);

export { router as dealRoutes };
