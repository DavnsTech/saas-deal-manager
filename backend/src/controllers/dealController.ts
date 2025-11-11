import { Request, Response, NextFunction } from 'express';
import * as dealService from '../services/dealService';
import { AuthenticatedRequest } from '../middleware/security'; // Assuming this type is exported

export const createDeal = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const userId = req.user!.id; // Get user ID from authenticated request
        const dealData = { ...req.body, userId }; // Add userId to the deal data
        const newDeal = await dealService.createDeal(dealData);
        res.status(201).json(newDeal);
    } catch (error: any) {
        console.error('Controller error in createDeal:', error.message);
        res.status(400).json({ message: error.message });
    }
};

export const getAllDeals = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const userId = req.user!.id; // Get user ID from authenticated request
        const deals = await dealService.getAllDeals(userId);
        res.json(deals);
    } catch (error: any) {
        console.error('Controller error in getAllDeals:', error.message);
        res.status(500).json({ message: error.message });
    }
};

export const getDealById = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const id = parseInt(req.params.id, 10);
        const userId = req.user!.id; // Get user ID from authenticated request

        if (isNaN(id)) {
            res.status(400).json({ message: 'Invalid deal ID' });
            return;
        }

        const deal = await dealService.getDealById(id, userId);
        if (!deal) {
            res.status(404).json({ message: 'Deal not found or unauthorized' });
            return;
        }
        res.json(deal);
    } catch (error: any) {
        console.error('Controller error in getDealById:', error.message);
        res.status(500).json({ message: error.message });
    }
};

export const updateDeal = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const id = parseInt(req.params.id, 10);
        const userId = req.user!.id; // Get user ID from authenticated request

        if (isNaN(id)) {
            res.status(400).json({ message: 'Invalid deal ID' });
            return;
        }

        const updatedDeal = await dealService.updateDeal(id, userId, req.body);
        if (!updatedDeal) {
            res.status(404).json({ message: 'Deal not found or unauthorized' });
            return;
        }
        res.json(updatedDeal);
    } catch (error: any) {
        console.error('Controller error in updateDeal:', error.message);
        res.status(400).json({ message: error.message }); // Use 400 for validation/permission errors from service
    }
};

export const deleteDeal = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const id = parseInt(req.params.id, 10);
        const userId = req.user!.id; // Get user ID from authenticated request

        if (isNaN(id)) {
            res.status(400).json({ message: 'Invalid deal ID' });
            return;
        }

        await dealService.deleteDeal(id, userId);
        res.status(204).json({ message: 'Deal deleted successfully' }); // 204 No Content is standard for successful delete
    } catch (error: any) {
        console.error('Controller error in deleteDeal:', error.message);
        res.status(404).json({ message: error.message }); // Likely "not found or unauthorized"
    }
};
