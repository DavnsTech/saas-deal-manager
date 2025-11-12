import Deal from '../models/Deal';
import { DealCreateRequest } from '../types';

export const getAllDeals = async (userId?: number) => {
  const whereClause = userId ? { userId } : {};
  return await Deal.findAll({ where: whereClause });
};

export const getDealById = async (id: number, userId?: number) => {
  const whereClause = userId ? { id, userId } : { id };
  return await Deal.findOne({ where: whereClause });
};

export const createDeal = async (dealData: DealCreateRequest, userId: number) => {
  return await Deal.create({ ...dealData, userId });
};

export const updateDeal = async (id: number, dealData: Partial<DealCreateRequest>, userId: number) => {
  const deal = await Deal.findOne({ where: { id, userId } });
  if (!deal) throw new Error('Deal not found or access denied');
  return await deal.update(dealData);
};

export const deleteDeal = async (id: number, userId: number) => {
  const deal = await Deal.findOne({ where: { id, userId } });
  if (!deal) throw new Error('Deal not found or access denied');
  await deal.destroy();
  return { message: 'Deal deleted successfully' };
};
