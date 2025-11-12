import { Router } from 'express';
import { createDeal, getDeals, getDealById, updateDeal, deleteDeal } from '../controllers/dealController';
import { authenticateToken } from '../middleware/security';

const router = Router();

// Apply authentication middleware to all deal routes
router.use(authenticateToken);

router.post('/', createDeal);
router.get('/', getDeals);
router.get('/:id', getDealById);
router.put('/:id', updateDeal);
router.delete('/:id', deleteDeal);

export default router;
