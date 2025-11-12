import { Request, Response } from 'express';
import { AppDataSource } from '../config/database';
import { Deal } from '../models/Deal';
import Joi from 'joi';

const dealRepository = AppDataSource.getRepository(Deal);

const createDealSchema = Joi.object({
  name: Joi.string().required(),
  amount: Joi.number().optional(),
  currency: Joi.string().optional(),
  status: Joi.string().optional(),
  stage: Joi.string().valid('Prospection', 'Qualification', 'Prise de contact', 'Découverte', 'Proposition de valeur', 'Négociation', 'Closing', 'Livraison/Onboarding', 'Fidélisation/Upsell/Cross-sell').required(),
  // Add more fields as per custom fields
});

export const getDeals = async (req: Request, res: Response) => {
  try {
    const deals = await dealRepository.find({ where: { userId: (req as any).user.id } });
    res.json(deals);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const createDeal = async (req: Request, res: Response) => {
  try {
    const { error } = createDealSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const deal = dealRepository.create({ ...req.body, userId: (req as any).user.id });
    await dealRepository.save(deal);
    res.status(201).json(deal);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Add getDealById, updateDeal, deleteDeal similarly
export const getDealById = async (req: Request, res: Response) => {
  try {
    const deal = await dealRepository.findOneBy({ id: parseInt(req.params.id), userId: (req as any).user.id });
    if (!deal) return res.status(404).json({ message: 'Deal not found' });
    res.json(deal);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const updateDeal = async (req: Request, res: Response) => {
  try {
    const deal = await dealRepository.findOneBy({ id: parseInt(req.params.id), userId: (req as any).user.id });
    if (!deal) return res.status(404).json({ message: 'Deal not found' });
    dealRepository.merge(deal, req.body);
    await dealRepository.save(deal);
    res.json(deal);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const deleteDeal = async (req: Request, res: Response) => {
  try {
    const deal = await dealRepository.findOneBy({ id: parseInt(req.params.id), userId: (req as any).user.id });
    if (!deal) return res.status(404).json({ message: 'Deal not found' });
    await dealRepository.remove(deal);
    res.json({ message: 'Deal deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
