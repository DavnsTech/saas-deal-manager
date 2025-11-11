import { Deal as DealType } from '../types';
import { DealModel } from '../models/Deal';

export const DealService = {
  async getAllDeals(): Promise<DealType[]> {
    return DealModel.findAll();
  },

  async getDealById(id: string): Promise<DealType | undefined> {
    return DealModel.findById(id);
  },

  async createDeal(dealData: Omit<DealType, 'id' | 'createdAt' | 'updatedAt'>): Promise<DealType> {
    // Basic validation can be added here
    if (!dealData.name || !dealData.stage || dealData.value === undefined || !dealData.ownerId) {
      throw new Error('Missing required deal fields');
    }
    return DealModel.create(dealData);
  },

  async updateDeal(id: string, updateData: Partial<DealType>): Promise<DealType | undefined> {
    // More specific validation can be added here, e.g., checking if stage is valid
    return DealModel.update(id, updateData);
  },

  async deleteDeal(id: string): Promise<boolean> {
    return DealModel.delete(id);
  },

  async getDealsByOwner(ownerId: string): Promise<DealType[]> {
    return DealModel.findByOwnerId(ownerId);
  }
};
