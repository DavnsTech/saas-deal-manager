import { Request, Response } from 'express';
import { AppDataSource } from '../config/database';
import { Deal } from '../models/Deal';

const dealRepository = AppDataSource.getRepository(Deal);

export const createDeal = async (req: Request, res: Response) => {
  const { name, stage, company, contactPerson, value, expectedCloseDate } = req.body;

  if (!name || !stage) {
    return res.status(400).json({ message: 'Deal name and stage are required' });
  }

  try {
    const newDeal = dealRepository.create({
      name,
      stage,
      company,
      contactPerson,
      value: value ? parseFloat(value) : undefined, // Ensure value is a number
      expectedCloseDate: expectedCloseDate ? new Date(expectedCloseDate) : undefined,
    });
    await dealRepository.save(newDeal);
    res.status(201).json(newDeal);
  } catch (error) {
    console.error('Error creating deal:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getDeals = async (req: Request, res: Response) => {
  try {
    const deals = await dealRepository.find();
    res.status(200).json(deals);
  } catch (error) {
    console.error('Error fetching deals:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getDealById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const deal = await dealRepository.findOneBy({ id: parseInt(id, 10) });
    if (!deal) {
      return res.status(404).json({ message: 'Deal not found' });
    }
    res.status(200).json(deal);
  } catch (error) {
    console.error(`Error fetching deal ${id}:`, error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const updateDeal = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, stage, company, contactPerson, value, expectedCloseDate } = req.body;

  try {
    const deal = await dealRepository.findOneBy({ id: parseInt(id, 10) });
    if (!deal) {
      return res.status(404).json({ message: 'Deal not found' });
    }

    if (name !== undefined) deal.name = name;
    if (stage !== undefined) deal.stage = stage;
    if (company !== undefined) deal.company = company;
    if (contactPerson !== undefined) deal.contactPerson = contactPerson;
    if (value !== undefined) deal.value = parseFloat(value);
    if (expectedCloseDate !== undefined) deal.expectedCloseDate = new Date(expectedCloseDate);

    await dealRepository.save(deal);
    res.status(200).json(deal);
  } catch (error) {
    console.error(`Error updating deal ${id}:`, error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const deleteDeal = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await dealRepository.delete(id);
    if (result.affected === 0) {
      return res.status(404).json({ message: 'Deal not found' });
    }
    res.status(200).json({ message: 'Deal deleted successfully' });
  } catch (error) {
    console.error(`Error deleting deal ${id}:`, error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
