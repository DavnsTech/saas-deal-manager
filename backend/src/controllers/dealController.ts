import { Request, Response, NextFunction } from 'express';
import { DealService, ValidationError } from '../services/dealService';
import { DealInput, DealUpdate } from '../models/Deal'; // Assuming these are exported from Deal.ts

export class DealController {
    private dealService: DealService;

    constructor(dealService: DealService) {
        this.dealService = dealService;
    }

    /**
     * Handler for GET /deals
     */
    async getAllDeals(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const deals = await this.dealService.getAllDeals();
            res.status(200).json(deals);
        } catch (error) {
            console.error('Error fetching all deals:', error);
            next(error); // Pass error to Express error handler
        }
    }

    /**
     * Handler for GET /deals/:id
     */
    async getDealById(req: Request, res: Response, next: NextFunction): Promise<void> {
        const { id } = req.params;
        try {
            const deal = await this.dealService.getDealById(id);
            if (!deal) {
                return res.status(404).json({ message: 'Deal not found' });
            }
            res.status(200).json(deal);
        } catch (error) {
            console.error(`Error fetching deal ${id}:`, error);
            next(error);
        }
    }

    /**
     * Handler for POST /deals
     */
    async createDeal(req: Request, res: Response, next: NextFunction): Promise<void> {
        const dealData: DealInput = req.body;
        try {
            const newDeal = await this.dealService.createDeal(dealData);
            res.status(201).json(newDeal);
        } catch (error) {
            if (error instanceof ValidationError) {
                console.warn('Validation error creating deal:', error.message);
                return res.status(400).json({ message: error.message });
            }
            console.error('Error creating deal:', error);
            next(error);
        }
    }

    /**
     * Handler for PUT /deals/:id
     */
    async updateDeal(req: Request, res: Response, next: NextFunction): Promise<void> {
        const { id } = req.params;
        const updateData: DealUpdate = req.body;
        try {
            const updatedDeal = await this.dealService.updateDeal(id, updateData);
            if (!updatedDeal) {
                return res.status(404).json({ message: 'Deal not found' });
            }
            res.status(200).json(updatedDeal);
        } catch (error) {
            if (error instanceof ValidationError) {
                console.warn('Validation error updating deal:', error.message);
                return res.status(400).json({ message: error.message });
            }
            console.error(`Error updating deal ${id}:`, error);
            next(error);
        }
    }

    /**
     * Handler for DELETE /deals/:id
     */
    async deleteDeal(req: Request, res: Response, next: NextFunction): Promise<void> {
        const { id } = req.params;
        try {
            const deleted = await this.dealService.deleteDeal(id);
            if (!deleted) {
                return res.status(404).json({ message: 'Deal not found' });
            }
            res.status(204).send(); // 204 No Content for successful deletion
        } catch (error) {
            console.error(`Error deleting deal ${id}:`, error);
            next(error);
        }
    }
}
