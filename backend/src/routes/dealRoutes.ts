import { Router } from 'express';
import {
  handleGetAllDeals,
  handleGetDealById,
  handleCreateDeal,
  handleUpdateDeal,
  handleDeleteDeal
} from '../controllers/dealController';
import { authenticateToken, authorizeRole } from '../middleware/security';

const router = Router();

// Publicly accessible or needs authentication depending on requirements
router.get('/', authenticateToken, handleGetAllDeals);
router.post('/', authenticateToken, handleCreateDeal); // Only authenticated users can create

// Routes requiring specific roles or ownership checks would be more complex
router.get('/:id', authenticateToken, handleGetDealById);
router.put('/:id', authenticateToken, authorizeRole(['admin']), handleUpdateDeal); // Example: Only admin can update
router.delete('/:id', authenticateToken, authorizeRole(['admin']), handleDeleteDeal); // Example: Only admin can delete

export default router;
