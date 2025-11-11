import { Router, Request, Response } from 'express';
import * as dealService from '../services/dealService'; // Assuming services handle business logic

const router = Router();

// GET /api/deals
router.get('/', async (req: Request, res: Response) => {
  try {
    const deals = await dealService.getAllDeals();
    res.json(deals);
  } catch (error: any) {
    console.error('Error fetching deals:', error);
    res.status(500).json({ message: 'Failed to retrieve deals', error: error.message });
  }
});

// GET /api/deals/:id
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const deal = await dealService.getDealById(req.params.id);
    if (!deal) {
      return res.status(404).json({ message: 'Deal not found' });
    }
    res.json(deal);
  } catch (error: any) {
    console.error(`Error fetching deal ${req.params.id}:`, error);
    res.status(500).json({ message: 'Failed to retrieve deal', error: error.message });
  }
});

// POST /api/deals
router.post('/', async (req: Request, res: Response) => {
  try {
    // Basic input validation (more robust validation recommended)
    const { name, clientName, value, stage } = req.body;
    if (!name || !clientName || typeof value !== 'number' || !stage) {
      return res.status(400).json({ message: 'Missing required fields or invalid data types' });
    }
    const newDeal = await dealService.createDeal(req.body);
    res.status(201).json(newDeal); // 201 Created
  } catch (error: any) {
    console.error('Error creating deal:', error);
    res.status(500).json({ message: 'Failed to create deal', error: error.message });
  }
});

// PUT /api/deals/:id
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const updatedDeal = await dealService.updateDeal(req.params.id, req.body);
    if (!updatedDeal) {
      return res.status(404).json({ message: 'Deal not found' });
    }
    res.json(updatedDeal);
  } catch (error: any) {
    console.error(`Error updating deal ${req.params.id}:`, error);
    res.status(500).json({ message: 'Failed to update deal', error: error.message });
  }
});

// DELETE /api/deals/:id
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const deletedCount = await dealService.deleteDeal(req.params.id);
    if (deletedCount === 0) {
      return res.status(404).json({ message: 'Deal not found' });
    }
    res.status(204).send(); // 204 No Content (successful deletion)
  } catch (error: any) {
    console.error(`Error deleting deal ${req.params.id}:`, error);
    res.status(500).json({ message: 'Failed to delete deal', error: error.message });
  }
});

export default router;
