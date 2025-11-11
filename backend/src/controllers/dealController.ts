import { Request, Response, NextFunction } from 'express';
import { dealService } from '../services/dealService';
import { Deal } from '../models/Deal'; // Assuming Deal model definition

// Mock DealService for demonstration
const mockDealService = {
    getAll: async (): Promise<Deal[]> => {
        return [
            { id: 'deal-1', name: 'Alpha Project', stage: 'Prospecting', value: 10000, createdAt: new Date(), updatedAt: new Date() },
            { id: 'deal-2', name: 'Beta Initiative', stage: 'Negotiation', value: 25000, createdAt: new Date(), updatedAt: new Date() },
        ];
    },
    getById: async (id: string): Promise<Deal | null> => {
        if (id === 'deal-1') {
            return { id: 'deal-1', name: 'Alpha Project', stage: 'Prospecting', value: 10000, createdAt: new Date(), updatedAt: new Date() };
        }
        return null;
    },
    create: async (dealData: Partial<Deal>): Promise<Deal> => {
        const newDeal: Deal = {
            id: `deal-${Math.random().toString(36).substring(7)}`,
            ...dealData,
            createdAt: new Date(),
            updatedAt: new Date(),
        } as Deal;
        return newDeal;
    },
    update: async (id: string, dealData: Partial<Deal>): Promise<Deal | null> => {
        if (id === 'deal-1') {
            return { id: 'deal-1', name: 'Alpha Project Updated', stage: 'Qualification', value: 12000, createdAt: new Date(), updatedAt: new Date() };
        }
        return null;
    },
    delete: async (id: string): Promise<boolean> => {
        return id === 'deal-1';
    }
};


export const dealController = {
    getAllDeals: async (req: Request, res: Response, next: NextFunction) => {
        try {
            // In a real app, you'd likely use req.user.userId from the security middleware
            const deals = await mockDealService.getAll(); // Pass userId if filtering by user
            res.status(200).json(deals);
        } catch (error) {
            next(error);
        }
    },

    getDealById: async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ message: 'Deal ID is required' });
        }

        try {
            const deal = await mockDealService.getById(id);
            if (!deal) {
                return res.status(404).json({ message: 'Deal not found' });
            }
            // Authorization check here
            res.status(200).json(deal);
        } catch (error) {
            next(error);
        }
    },

    createDeal: async (req: Request, res: Response, next: NextFunction) => {
        const dealData = req.body;
        // Basic validation
        if (!dealData.name || !dealData.stage || dealData.value === undefined) {
            return res.status(400).json({ message: 'Deal name, stage, and value are required' });
        }

        try {
            // In a real app, you'd associate the deal with the logged-in user (req.user.userId)
            const newDeal = await mockDealService.create(dealData);
            res.status(201).json(newDeal);
        } catch (error) {
            next(error);
        }
    },

    updateDeal: async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params;
        const dealData = req.body;

        if (!id) {
            return res.status(400).json({ message: 'Deal ID is required' });
        }

        try {
            // Authorization check before updating
            const updatedDeal = await mockDealService.update(id, dealData);
            if (!updatedDeal) {
                return res.status(404).json({ message: 'Deal not found' });
            }
            res.status(200).json(updatedDeal);
        } catch (error) {
            next(error);
        }
    },

    deleteDeal: async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ message: 'Deal ID is required' });
        }

        try {
            // Authorization check before deleting
            const success = await mockDealService.delete(id);
            if (!success) {
                return res.status(404).json({ message: 'Deal not found' });
            }
            res.status(204).send(); // No content on successful deletion
        } catch (error) {
            next(error);
        }
    },
};
