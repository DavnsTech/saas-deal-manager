import { Deal, DealInput, DealUpdate } from '../models/Deal'; // Assuming Deal.ts exports these types
import { v4 as uuidv4 } from 'uuid'; // For generating unique IDs
import { ValidationError } from '../utils/errors'; // Custom error for validation

// In a real app, this would interact with a database (e.g., Prisma, TypeORM, Mongoose)
// For demonstration, we'll use an in-memory array.
let mockDeals: Deal[] = [
    {
        id: uuidv4(),
        name: 'Alpha Project Deal',
        stage: 'Prospecting',
        value: 10000,
        createdAt: new Date(),
        updatedAt: new Date(),
        customFields: {
            priority: 'High'
        }
    },
    {
        id: uuidv4(),
        name: 'Beta Software License',
        stage: 'Negotiation',
        value: 25000,
        createdAt: new Date(),
        updatedAt: new Date(),
        customFields: {
            clientType: 'Enterprise'
        }
    }
];

export class DealService {
    /**
     * Retrieves all deals.
     * @returns Promise<Deal[]> - A promise that resolves with an array of deals.
     */
    async getAllDeals(): Promise<Deal[]> {
        // In a real scenario, this would involve a database query.
        // Example: return await prisma.deal.findMany();
        console.log('Fetching all deals...');
        return Promise.resolve(mockDeals.map(deal => ({ ...deal, createdAt: deal.createdAt.toISOString(), updatedAt: deal.updatedAt.toISOString() })));
    }

    /**
     * Retrieves a single deal by its ID.
     * @param id - The ID of the deal to retrieve.
     * @returns Promise<Deal | null> - A promise that resolves with the deal or null if not found.
     */
    async getDealById(id: string): Promise<Deal | null> {
        console.log(`Fetching deal by ID: ${id}`);
        const deal = mockDeals.find(d => d.id === id);
        if (!deal) {
            return null;
        }
        return Promise.resolve({ ...deal, createdAt: deal.createdAt.toISOString(), updatedAt: deal.updatedAt.toISOString() });
    }

    /**
     * Creates a new deal.
     * @param dealData - The data for the new deal.
     * @returns Promise<Deal> - A promise that resolves with the newly created deal.
     * @throws {ValidationError} If the input data is invalid.
     */
    async createDeal(dealData: DealInput): Promise<Deal> {
        console.log('Creating new deal:', dealData);
        if (!dealData.name || typeof dealData.name !== 'string' || dealData.name.trim() === '') {
            throw new ValidationError('Deal name is required and must be a non-empty string.');
        }
        if (dealData.value !== undefined && (typeof dealData.value !== 'number' || dealData.value < 0)) {
            throw new ValidationError('Deal value must be a non-negative number.');
        }
        // Add more validation for stage, custom fields, etc.

        const newDeal: Deal = {
            id: uuidv4(),
            name: dealData.name.trim(),
            stage: dealData.stage || 'Prospecting', // Default stage
            value: dealData.value || 0, // Default value
            createdAt: new Date(),
            updatedAt: new Date(),
            customFields: dealData.customFields || {}
        };

        mockDeals.push(newDeal);
        console.log('Deal created:', newDeal);
        return Promise.resolve({ ...newDeal, createdAt: newDeal.createdAt.toISOString(), updatedAt: newDeal.updatedAt.toISOString() });
    }

    /**
     * Updates an existing deal.
     * @param id - The ID of the deal to update.
     * @param updateData - The data to update the deal with.
     * @returns Promise<Deal | null> - A promise that resolves with the updated deal or null if not found.
     * @throws {ValidationError} If the input data is invalid.
     */
    async updateDeal(id: string, updateData: DealUpdate): Promise<Deal | null> {
        console.log(`Updating deal ${id} with data:`, updateData);
        const dealIndex = mockDeals.findIndex(d => d.id === id);

        if (dealIndex === -1) {
            console.warn(`Deal with ID ${id} not found for update.`);
            return null;
        }

        const existingDeal = mockDeals[dealIndex];
        const updatedDeal = {
            ...existingDeal,
            ...updateData,
            updatedAt: new Date(),
            // Ensure ID and createdAt are not accidentally changed
            id: existingDeal.id,
            createdAt: existingDeal.createdAt
        };

        // Perform validation on updated fields
        if (updateData.name !== undefined && (typeof updateData.name !== 'string' || updateData.name.trim() === '')) {
            throw new ValidationError('Deal name must be a non-empty string.');
        }
        if (updateData.value !== undefined && (typeof updateData.value !== 'number' || updateData.value < 0)) {
            throw new ValidationError('Deal value must be a non-negative number.');
        }
        // Add more validation for stage, custom fields, etc.

        mockDeals[dealIndex] = updatedDeal;
        console.log('Deal updated:', updatedDeal);
        return Promise.resolve({ ...updatedDeal, createdAt: updatedDeal.createdAt.toISOString(), updatedAt: updatedDeal.updatedAt.toISOString() });
    }

    /**
     * Deletes a deal by its ID.
     * @param id - The ID of the deal to delete.
     * @returns Promise<boolean> - A promise that resolves with true if deleted, false if not found.
     */
    async deleteDeal(id: string): Promise<boolean> {
        console.log(`Deleting deal by ID: ${id}`);
        const initialLength = mockDeals.length;
        mockDeals = mockDeals.filter(d => d.id !== id);
        const deleted = mockDeals.length < initialLength;
        if (deleted) {
            console.log('Deal deleted.');
        } else {
            console.warn(`Deal with ID ${id} not found for deletion.`);
        }
        return Promise.resolve(deleted);
    }
}

// Helper for custom errors (can be in a separate utils file)
export class ValidationError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'ValidationError';
    }
}
