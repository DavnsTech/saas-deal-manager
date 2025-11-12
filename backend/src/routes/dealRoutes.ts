import { Router } from 'express';
import { getDeals, createDeal } from '../controllers/dealController';

const router = Router();

router.get('/', getDeals);
router.post('/', createDeal);

export default router;
