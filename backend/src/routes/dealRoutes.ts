import { Router } from 'express';
import { getDeals, getDeal, createDeal, updateDeal, deleteDeal } from '../controllers/dealController';
import { authenticateToken } from '../middleware/security';

const router = Router();

router.use(authenticateToken);

router.get('/', getDeals);
router.get('/:id', getDeal);
router.post('/', createDeal);
router.put('/:id', updateDeal);
router.delete('/:id', deleteDeal);

export default router;
