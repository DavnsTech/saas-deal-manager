import { Request, Response } from 'express';
import { DealService } from '../services/dealService';
import { IDeal } from '../models/Deal';

const dealService = new DealService();

export class DealController {
  async getAllDeals(req: Request, res: Response): Promise<void> {
    try {
      const filters = {
        stage: req.query.stage as string,
        search: req.query.search as string
      };
      
      const deals = await dealService.getAllDeals(filters);
      res.status(200).json(deals);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching deals', error });
    }
  }

  async getDealById(req: Request, res: Response): Promise<void> {
    try {
      const deal = await dealService.getDealById(req.params.id);
      if (!deal) {
        res.status(404).json({ message: 'Deal not found' });
        return;
      }
      res.status(200).json(deal);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching deal', error });
    }
  }

  async createDeal(req: Request, res: Response): Promise<void> {
    try {
      const dealData: Partial<IDeal> = req.body;
      const deal = await dealService.createDeal(dealData);
      res.status(201).json(deal);
    } catch (error) {
      res.status(500).json({ message: 'Error creating deal', error });
    }
  }

  async updateDeal(req: Request, res: Response): Promise<void> {
    try {
      const dealData: Partial<IDeal> = req.body;
      const deal = await dealService.updateDeal(req.params.id, dealData);
      
      if (!deal) {
        res.status(404).json({ message: 'Deal not found' });
        return;
      }
      
      res.status(200).json(deal);
    } catch (error) {
      res.status(500).json({ message: 'Error updating deal', error });
    }
  }

  async deleteDeal(req: Request, res: Response): Promise<void> {
    try {
      const success = await dealService.deleteDeal(req.params.id);
      
      if (!success) {
        res.status(404).json({ message: 'Deal not found' });
        return;
      }
      
      res.status(200).json({ message: 'Deal deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting deal', error });
    }
  }
}
