import { Deal as DealType } from '../types';
import { v4 as uuidv4 } from 'uuid';

// In-memory database for demonstration purposes.
const deals: DealType[] = [];

export const DealModel = {
  async findAll(): Promise<DealType[]> {
    return [...deals]; // Return a copy
  },

  async findById(id: string): Promise<DealType | undefined> {
    return deals.find((deal) => deal.id === id);
  },

  async create(dealData: Omit<DealType, 'id' | 'createdAt' | 'updatedAt'>): Promise<DealType> {
    const now = new Date();
    const newDeal: DealType = {
      id: uuidv4(),
      createdAt: now,
      updatedAt: now,
      ...dealData,
    };
    deals.push(newDeal);
    return { ...newDeal }; // Return a copy
  },

  async update(id: string, updateData: Partial<DealType>): Promise<DealType | undefined> {
    const dealIndex = deals.findIndex((deal) => deal.id === id);
    if (dealIndex === -1) {
      return undefined;
    }

    const updatedDeal = {
      ...deals[dealIndex],
      ...updateData,
      updatedAt: new Date(),
    };
    deals[dealIndex] = updatedDeal;
    return { ...updatedDeal }; // Return a copy
  },

  async delete(id: string): Promise<boolean> {
    const initialLength = deals.length;
    const newDeals = deals.filter((deal) => deal.id !== id);
    if (newDeals.length < initialLength) {
      // Modify the original array (for in-memory simulation)
      deals.length = 0;
      deals.push(...newDeals);
      return true;
    }
    return false;
  },

  async findByOwnerId(ownerId: string): Promise<DealType[]> {
    return deals.filter((deal) => deal.ownerId === ownerId);
  }
};
