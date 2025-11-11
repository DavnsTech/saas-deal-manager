import { Router } from 'express';
import {
  getAllDeals,
  getDealById,
  createDeal,
  updateDeal,
  deleteDeal
} from '../controllers/dealController';
import { authenticateToken, isResourceOwner } from '../middleware/security';

const router = Router();

// Public route for getting all deals (might be restricted in a real app)
// router.get('/', getAllDeals); // Consider authentication for this too

// Protect all other deal routes
router.use(authenticateToken);

router.post('/', createDeal); // Create a new deal (owner is the authenticated user)
router.get('/', getAllDeals); // Get all deals for the authenticated user (or all if admin) - adjust as per requirements

router.get('/:dealId', getDealById); // Get a specific deal
router.patch('/:dealId', isResourceOwner('deal'), updateDeal); // Update a specific deal (only owner)
router.delete('/:dealId', isResourceOwner('deal'), deleteDeal); // Delete a specific deal (only owner)

export default router;
