// Assuming a simple in-memory store or a placeholder for a database model.
// In a real app, you'd use an ORM (e.g., Prisma, TypeORM, Sequelize).

export enum DealStage {
  PROSPECTING = 'Prospecting',
  QUALIFICATION = 'Qualification',
  NEEDS_ANALYSIS = 'Needs Analysis',
  PROPOSAL = 'Proposal',
  NEGOTIATION = 'Negotiation',
  CLOSED_WON = 'Closed Won',
  CLOSED_LOST = 'Closed Lost',
}

export interface Deal {
  id: string;
  name: string;
  company: string;
  value: number;
  stage: DealStage;
  ownerId: string; // Foreign key to User
  createdAt: Date;
  updatedAt: Date;
  // Add custom fields here as needed, potentially as a flexible JSON field or separate table
  customFields?: Record<string, any>;
}

// Example of how you might interact with a deal store (e.g., in-memory for demonstration)
let deals: Deal[] = [];
let nextDealId = 1;

export const createDeal = (dealData: Omit<Deal, 'id' | 'createdAt' | 'updatedAt'>): Deal => {
  const newDeal: Deal = {
    ...dealData,
    id: String(nextDealId++),
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  deals.push(newDeal);
  return newDeal;
};

export const getDealById = (id: string): Deal | undefined => {
  return deals.find(deal => deal.id === id);
};

export const getAllDeals = (ownerId?: string): Deal[] => {
  if (ownerId) {
    return deals.filter(deal => deal.ownerId === ownerId);
  }
  return [...deals]; // Return a copy
};

export const updateDeal = (id: string, updateData: Partial<Deal>): Deal | undefined => {
  const dealIndex = deals.findIndex(deal => deal.id === id);
  if (dealIndex === -1) {
    return undefined; // Deal not found
  }

  // Merge existing deal with updated data
  deals[dealIndex] = {
    ...deals[dealIndex],
    ...updateData,
    updatedAt: new Date(), // Always update the updatedAt timestamp
  };
  return deals[dealIndex];
};

export const deleteDeal = (id: string): boolean => {
  const initialLength = deals.length;
  deals = deals.filter(deal => deal.id !== id);
  return deals.length < initialLength; // True if a deal was removed
};
