import Deal, { IDeal } from '../models/Deal';
import { Deal as DealType } from '../types';

export const getAllDeals = async (userId: string): Promise<IDeal[]> => {
  // In a real app, you might filter by user role or assigned user
  return Deal.find().populate('customerId').populate('assignedUserId').exec();
};

export const getDealById = async (id: string): Promise<IDeal | null> => {
  return Deal.findById(id).populate('customerId').populate('assignedUserId').exec();
};

export const createDeal = async (dealData: DealType): Promise<IDeal> => {
  const newDeal = new Deal(dealData);
  await newDeal.save();
  return newDeal;
};

export const updateDeal = async (id: string, dealData: Partial<DealType>): Promise<IDeal | null> => {
  const updatedDeal = await Deal.findByIdAndUpdate(id, dealData, { new: true, runValidators: true }).exec();
  return updatedDeal;
};

export const deleteDeal = async (id: string): Promise<IDeal | null> => {
  const deletedDeal = await Deal.findByIdAndDelete(id).exec();
  return deletedDeal;
};
