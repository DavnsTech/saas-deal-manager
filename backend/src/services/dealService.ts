import {
  createDeal as dbCreateDeal,
  getDealById as dbGetDealById,
  getAllDeals as dbGetAllDeals,
  updateDeal as dbUpdateDeal,
  deleteDeal as dbDeleteDeal,
  Deal,
  DealStage,
} from '../models/Deal';
import { findUserById } from '../models/User'; // To validate owner existence

export const createDeal = async (dealData: Omit<Deal, 'id' | 'createdAt' | 'updatedAt'>): Promise<Deal> => {
  // Basic validation: Ensure owner exists
  const owner = await findUserById(dealData.ownerId);
  if (!owner) {
    throw new Error(`User with ID ${dealData.ownerId} not found.`);
  }

  // Add more business logic validation here if needed
  if (dealData.value < 0) {
    throw new Error('Deal value cannot be negative.');
  }

  if (!Object.values(DealStage).includes(dealData.stage)) {
    throw new Error(`Invalid deal stage. Allowed stages are: ${Object.values(DealStage).join(', ')}.`);
  }

  return dbCreateDeal(dealData);
};

export const getDealById = async (id: string): Promise<Deal | undefined> => {
  return dbGetDealById(id);
};

export const getAllDeals = async (ownerId?: string): Promise<Deal[]> => {
  // You might add filtering or sorting logic here
  return dbGetAllDeals(ownerId);
};

export const updateDeal = async (id: string, updateData: Partial<Deal>): Promise<Deal | undefined> => {
  // Fetch the existing deal to ensure it exists before updating
  const existingDeal = await dbGetDealById(id);
  if (!existingDeal) {
    return undefined; // Deal not found
  }

  // Validate potential owner change
  if (updateData.ownerId && updateData.ownerId !== existingDeal.ownerId) {
    const newOwner = await findUserById(updateData.ownerId);
    if (!newOwner) {
      throw new Error(`User with ID ${updateData.ownerId} not found.`);
    }
  }

  // Validate new stage if provided
  if (updateData.stage && !Object.values(DealStage).includes(updateData.stage)) {
    throw new Error(`Invalid deal stage. Allowed stages are: ${Object.values(DealStage).join(', ')}.`);
  }

  if (updateData.value !== undefined && updateData.value < 0) {
    throw new Error('Deal value cannot be negative.');
  }

  return dbUpdateDeal(id, updateData);
};

export const deleteDeal = async (id: string): Promise<boolean> => {
  // You might add checks here, e.g., if a deal can be deleted if it's already closed.
  return dbDeleteDeal(id);
};
