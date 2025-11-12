import { Request, Response } from 'express';
import * as dealService from '../services/dealService';

export const getDeals = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id;
    const deals = await dealService.getAllDeals(userId);
    res.json(deals);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch deals' });
  }
};

export const getDeal = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = (req as any).user?.id;
    const deal = await dealService.getDealById(parseInt(id), userId);
    if (!deal) return res.status(404).json({ error: 'Deal not found' });
    res.json(deal);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch deal' });
  }
};

export const createDeal = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const deal = await dealService.createDeal(req.body, userId);
    res.status(201).json(deal);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create deal' });
  }
};

export const updateDeal = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = (req as any).user.id;
    const deal = await dealService.updateDeal(parseInt(id), req.body, userId);
    res.json(deal);
  } catch (error) {
    res.status(400).json({ error: error.message || 'Failed to update deal' });
  }
};

export const deleteDeal = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = (req as any).user.id;
    const result = await dealService.deleteDeal(parseInt(id), userId);
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: error.message || 'Failed to delete deal' });
  }
};
