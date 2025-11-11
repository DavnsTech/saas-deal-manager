import { Deal } from '../models/Deal';
// Assume a database client or ORM is imported and configured here
// import { dbClient } from '../db';

// Mock data store for demonstration
const mockDealDatabase: Deal[] = [
    { id: 'deal-1', name: 'Alpha Project', stage: 'Prospecting', value: 10000, createdAt: new Date(), updatedAt: new Date() },
    { id: 'deal-2', name: 'Beta Initiative', stage: 'Negotiation', value: 25000, createdAt: new Date(), updatedAt: new Date() },
];

let nextId = 3;

export const dealService = {
    getAll: async (userId?: string): Promise<Deal[]> => {
        // In a real app, filter by userId if applicable
        console.log(`Fetching all deals (user: ${userId || 'all'})`);
        return mockDealDatabase;
    },

    getById: async (id: string): Promise<Deal | null> => {
        console.log(`Fetching deal by ID: ${id}`);
        const deal = mockDealDatabase.find(d => d.id === id);
        return deal || null;
    },

    create: async (dealData: Omit<Deal, 'id' | 'createdAt' | 'updatedAt'>): Promise<Deal> => {
        console.log('Creating new deal:', dealData);
        // Basic validation, could be more robust
        if (!dealData.name || !dealData.stage || dealData.value === undefined) {
            throw new Error('Deal name, stage, and value are required.');
        }

        const newDeal: Deal = {
            id: `deal-${nextId++}`,
            ...dealData,
            createdAt: new Date(),
            updatedAt: new Date(),
        };
        mockDealDatabase.push(newDeal);
        return newDeal;
    },

    update: async (id: string, dealData: Partial<Deal>): Promise<Deal | null> => {
        console.log(`Updating deal ${id} with:`, dealData);
        const dealIndex = mockDealDatabase.findIndex(d => d.id === id);
        if (dealIndex === -1) {
            return null;
        }

        // Merge existing deal with new data
        mockDealDatabase[dealIndex] = {
            ...mockDealDatabase[dealIndex],
            ...dealData,
            updatedAt: new Date(),
        };
        return mockDealDatabase[dealIndex];
    },

    delete: async (id: string): Promise<boolean> => {
        console.log(`Deleting deal by ID: ${id}`);
        const initialLength = mockDealDatabase.length;
        const updatedDatabase = mockDealDatabase.filter(d => d.id !== id);
        if (updatedDatabase.length < initialLength) {
            // Update mockDatabase in place
            mockDealDatabase.length = 0;
            mockDealDatabase.push(...updatedDatabase);
            return true;
        }
        return false;
    },
};
