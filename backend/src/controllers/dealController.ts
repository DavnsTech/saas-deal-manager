import { Request, Response, NextFunction } from 'express';
import {
  getAllDeals,
  getDealById,
  createDeal,
  updateDeal,
  deleteDeal
} from '../services/dealService';
import { Deal as DealType } from '../types';

export const handleGetAllDeals = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Assuming user ID is available from authentication middleware
    const userId = (req as any).user.userId; // Cast to any to access user property if not strongly typed
    const deals = await getAllDeals(userId);
    res.status(200).json(deals);
  } catch (error) {
    next(error);
  }
};

export const handleGetDealById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const deal = await getDealById(id);
    if (!deal) {
      return res.status(404).json({ message: 'Deal not found' });
    }
    res.status(200).json(deal);
  } catch (error) {
    next(error);
  }
};

export const handleCreateDeal = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const dealData: DealType = req.body;
    // Basic validation (more robust validation should be added)
    if (!dealData.name || !dealData.value || !dealData.stage || !dealData.customerId || !dealData.assignedUserId) {
      return res.status(400).json({ message: 'Missing required fields' });
    }
    const newDeal = await createDeal(dealData);
    res.status(201).json(newDeal);
  } catch (error) {
    next(error);
  }
};

export const handleUpdateDeal = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const dealData: Partial<DealType> = req.body;
    const updatedDeal = await updateDeal(id, dealData);
    if (!updatedDeal) {
      return res.status(404).json({ message: 'Deal not found' });
    }
    res.status(200).json(updatedDeal);
  } catch (error) {
    next(error);
  }
};

export const handleDeleteDeal = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const deletedDeal = await deleteDeal(id);
    if (!deletedDeal) {
      return res.status(404).json({ message: 'Deal not found' });
    }
    res.status(200).json({ message: 'Deal deleted successfully', deal: deletedDeal });
  } catch (error) {
    next(error);
  }
};
