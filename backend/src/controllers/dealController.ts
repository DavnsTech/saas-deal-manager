import { Response } from 'express';
import { Deal } from '../models/Deal';
import { AuthRequest } from '../types';
import { body, validationResult } from 'express-validator';

export const getDeals = async (req: AuthRequest, res: Response) => {
  try {
    const deals = await Deal.findAll({ where: { userId: req.user!.id } });
    res.json(deals);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching deals' });
  }
};

export const getDealById = async (req: AuthRequest, res: Response) => {
  try {
    const deal = await Deal.findOne({ where: { id: req.params.id, userId: req.user!.id } });
    if (!deal) return res.status(404).json({ message: 'Deal not found' });
    res.json(deal);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching deal' });
  }
};

export const createDeal = [
  body('nomDeal').notEmpty().withMessage('Deal name is required'),
  body('montant').isNumeric().withMessage('Amount must be a number'),
  async (req: AuthRequest, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const deal = await Deal.create({ ...req.body, userId: req.user!.id });
      res.status(201).json(deal);
    } catch (error) {
      res.status(500).json({ message: 'Error creating deal' });
    }
  }
];

export const updateDeal = [
  body('montant').optional().isNumeric().withMessage('Amount must be a number'),
  async (req: AuthRequest, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const deal = await Deal.findOne({ where: { id: req.params.id, userId: req.user!.id } });
      if (!deal) return res.status(404).json({ message: 'Deal not found' });
      await deal.update(req.body);
      res.json(deal);
    } catch (error) {
      res.status(500).json({ message: 'Error updating deal' });
    }
  }
];

export const deleteDeal = async (req: AuthRequest, res: Response) => {
  try {
    const deal = await Deal.findOne({ where: { id: req.params.id, userId: req.user!.id } });
    if (!deal) return res.status(404).json({ message: 'Deal not found' });
    await deal.destroy();
    res.json({ message: 'Deal deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting deal' });
  }
};
