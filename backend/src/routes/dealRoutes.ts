import { Router } from 'express';
import { dealController } from '../controllers/dealController';
import { authenticateJWT } from '../middleware/security';

const router = Router();

// Apply authentication middleware to all routes in this file
router.use(authenticateJWT);

// GET all deals
router.get('/', dealController.getAllDeals);

// GET a specific deal by ID
router.get('/:id', dealController.getDealById);

// POST create a new deal
router.post('/', dealController.createDeal);

// PUT update an existing deal
router.put('/:id', dealController.updateDeal);

// DELETE a deal
router.delete('/:id', dealController.deleteDeal);

export default router;
