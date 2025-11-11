import { Request, Response } from 'express';
import { DealService } from '../services/dealService';
import { Deal as DealType } from '../types';

export const getAllDeals = async (req: Request, res: Response) => {
  try {
    const deals = await DealService.getAllDeals();
    res.json(deals);
  } catch (error) {
    console.error('Get all deals error:', error);
    res.status(500).json({ message: 'Internal server error fetching deals' });
  }
};

export const getDealById = async (req: Request, res: Response) => {
  const { dealId } = req.params;
  try {
    const deal = await DealService.getDealById(dealId);
    if (!deal) {
      return res.sendStatus(404);
    }
    res.json(deal);
  } catch (error) {
    console.error(`Get deal by ID error for ${dealId}:`, error);
    res.status(500).json({ message: 'Internal server error fetching deal' });
  }
};

export const createDeal = async (req: Request, res: Response) => {
  const dealData: Omit<DealType, 'id' | 'createdAt' | 'updatedAt'> = req.body;
  const ownerId = req.user?.userId; // Get owner ID from authenticated user

  if (!ownerId) {
    return res.sendStatus(401); // User must be authenticated
  }

  // Add ownerId to the data being passed to the service
  const dealWithOwner = { ...dealData, ownerId };

  try {
    const newDeal = await DealService.createDeal(dealWithOwner);
    res.status(201).json(newDeal);
  } catch (error: any) {
    console.error('Create deal error:', error);
    // Handle specific validation errors if needed
    if (error.message.includes('Missing required deal fields')) {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: 'Internal server error creating deal' });
  }
};

export const updateDeal = async (req: Request, res: Response) => {
  const { dealId } = req.params;
  const updateData = req.body;

  try {
    // isResourceOwner middleware should have already checked ownership
    const updatedDeal = await DealService.updateDeal(dealId, updateData);
    if (!updatedDeal) {
      return res.sendStatus(404);
    }
    res.json(updatedDeal);
  } catch (error) {
    console.error(`Update deal error for ${dealId}:`, error);
    res.status(500).json({ message: 'Internal server error updating deal' });
  }
};

export const deleteDeal = async (req: Request, res: Response) => {
  const { dealId } = req.params;

  try {
    // isResourceOwner middleware should have already checked ownership
    const deleted = await DealService.deleteDeal(dealId);
    if (!deleted) {
      return res.sendStatus(404);
    }
    res.sendStatus(204); // No Content
  } catch (error) {
    console.error(`Delete deal error for ${dealId}:`, error);
    res.status(500).json({ message: 'Internal server error deleting deal' });
  }
};
