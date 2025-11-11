import { Request, Response } from 'express';
import { Deal } from '../models/Deal';
import { dealService } from '../services/dealService';

export const getDeals = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const deals = await dealService.getDealsByUser(userId);
    res.json(deals);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch deals' });
  }
};

export const getDeal = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = (req as any).user.id;
    const deal = await dealService.getDealById(parseInt(id), userId);
    if (!deal) {
      return res.status(404).json({ error: 'Deal not found' });
    }
    res.json(deal);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch deal' });
  }
};

export const createDeal = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const dealData = { ...req.body, assignedUserId: userId };
    const deal = await dealService.createDeal(dealData);
    res.status(201).json(deal);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create deal' });
  }
};

export const updateDeal = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = (req as any).user.id;
    const updatedDeal = await dealService.updateDeal(parseInt(id), req.body, userId);
    if (!updatedDeal) {
      return res.status(404).json({ error: 'Deal not found' });
    }
    res.json(updatedDeal);
  } catch (error) {
    res.status(400).json({ error: 'Failed to update deal' });
  }
};

export const deleteDeal = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = (req as any).user.id;
    const deleted = await dealService.deleteDeal(parseInt(id), userId);
    if (!deleted) {
      return res.status(404).json({ error: 'Deal not found' });
    }
    res.json({ message: 'Deal deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete deal' });
  }
};
