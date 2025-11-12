import { Request, Response, NextFunction } from 'express';
import { Deal } from '../models/Deal'; // Assuming Deal is a Sequelize model or similar
import { DealService } from '../services/dealService';
import { logger } from '../utils/logger'; // Assuming a logger utility

// Interface for request body to ensure type safety
interface CreateDealRequestBody {
    name: string;
    description?: string;
    stage: string;
    value: number;
    // Add other relevant fields
}

interface UpdateDealRequestBody {
    name?: string;
    description?: string;
    stage?: string;
    value?: number;
    // Add other relevant fields
}

export class DealController {
    private dealService: DealService;

    constructor(dealService: DealService) {
        this.dealService = dealService;
    }

    /**
     * @route   GET /api/deals
     * @desc    Get all deals
     * @access  Private
     */
    public async getAllDeals(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const deals = await this.dealService.findAllDeals();
            res.status(200).json(deals);
        } catch (error: any) {
            logger.error(`Error fetching all deals: ${error.message}`);
            // More specific error handling can be added here
            res.status(500).json({ message: 'Failed to retrieve deals.' });
        }
    }

    /**
     * @route   GET /api/deals/:id
     * @desc    Get a single deal by ID
     * @access  Private
     */
    public async getDealById(req: Request, res: Response, next: NextFunction): Promise<void> {
        const { id } = req.params;

        try {
            const deal = await this.dealService.findDealById(parseInt(id, 10)); // Ensure id is a number

            if (!deal) {
                return res.status(404).json({ message: 'Deal not found.' });
            }

            res.status(200).json(deal);
        } catch (error: any) {
            logger.error(`Error fetching deal by ID ${id}: ${error.message}`);
            res.status(500).json({ message: 'Failed to retrieve deal.' });
        }
    }

    /**
     * @route   POST /api/deals
     * @desc    Create a new deal
     * @access  Private
     */
    public async createDeal(req: Request, res: Response, next: NextFunction): Promise<void> {
        const dealData: CreateDealRequestBody = req.body;

        // Basic input validation (more robust validation might be needed)
        if (!dealData.name || !dealData.stage || dealData.value === undefined) {
            return res.status(400).json({ message: 'Missing required fields: name, stage, value.' });
        }

        try {
            const newDeal = await this.dealService.createDeal(dealData);
            res.status(201).json(newDeal);
        } catch (error: any) {
            logger.error(`Error creating deal: ${error.message}`);
            // Handle specific creation errors (e.g., duplicate name if applicable)
            res.status(500).json({ message: 'Failed to create deal.' });
        }
    }

    /**
     * @route   PUT /api/deals/:id
     * @desc    Update an existing deal
     * @access  Private
     */
    public async updateDeal(req: Request, res: Response, next: NextFunction): Promise<void> {
        const { id } = req.params;
        const dealData: UpdateDealRequestBody = req.body;

        // Prevent updating fields that should not be changed via this endpoint if necessary
        // e.g., delete dealData.createdAt;

        try {
            const updatedDeal = await this.dealService.updateDeal(parseInt(id, 10), dealData);

            if (!updatedDeal) {
                return res.status(404).json({ message: 'Deal not found.' });
            }

            res.status(200).json(updatedDeal);
        } catch (error: any) {
            logger.error(`Error updating deal ${id}: ${error.message}`);
            res.status(500).json({ message: 'Failed to update deal.' });
        }
    }

    /**
     * @route   DELETE /api/deals/:id
     * @desc    Delete a deal
     * @access  Private
     */
    public async deleteDeal(req: Request, res: Response, next: NextFunction): Promise<void> {
        const { id } = req.params;

        try {
            const deletedCount = await this.dealService.deleteDeal(parseInt(id, 10));

            if (deletedCount === 0) {
                return res.status(404).json({ message: 'Deal not found.' });
            }

            res.status(204).send(); // No content to send back on successful deletion
        } catch (error: any) {
            logger.error(`Error deleting deal ${id}: ${error.message}`);
            res.status(500).json({ message: 'Failed to delete deal.' });
        }
    }
}

// Example of how this controller might be instantiated and used in routes
// Assuming you have an Express app instance and a DealService instance
// import express from 'express';
// const router = express.Router();
// const dealService = new DealService(); // Assuming a way to get DB connection/ORM instance
// const dealController = new DealController(dealService);

// router.get('/', dealController.getAllDeals.bind(dealController));
// router.get('/:id', dealController.getDealById.bind(dealController));
// router.post('/', dealController.createDeal.bind(dealController));
// router.put('/:id', dealController.updateDeal.bind(dealController));
// router.delete('/:id', dealController.deleteDeal.bind(dealController));

// export default router;
