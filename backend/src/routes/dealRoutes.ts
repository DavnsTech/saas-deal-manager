import { Router } from 'express';
import {
  createDeal,
  getDeals,
  getDealById,
  updateDeal,
  deleteDeal,
} from '../controllers/dealController';
import { authenticateToken } from '../middleware/security';

const router = Router();

// All deal routes require authentication
router.use(authenticateToken);

// POST /api/deals - Create a new deal
router.post('/', createDeal);

// GET /api/deals - Get all deals for the authenticated user
router.get('/', getDeals);

// GET /api/deals/:id - Get a specific deal by ID
router.get('/:id', getDealById);

// PUT /api/deals/:id - Update a specific deal by ID
router.put('/:id', updateDeal);

// DELETE /api/deals/:id - Delete a specific deal by ID
router.delete('/:id', deleteDeal);

export default router;
