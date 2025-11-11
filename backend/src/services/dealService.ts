// This service layer would interact with your database.
// For demonstration, we'll use an in-memory array and simulate DB operations.

import { Deal } from '../types/dealTypes'; // Assuming types are defined

// In-memory "database"
let deals: Deal[] = [
  { id: 'd1', name: 'Acquisition for TechCorp', clientName: 'TechCorp', value: 150000, stage: 'Negotiation' },
  { id: 'd2', name: 'SaaS Subscription for BizSolutions', clientName: 'BizSolutions', value: 25000, stage: 'Discovery' },
];
let nextId = 3;

export const getAllDeals = async (): Promise<Deal[]> => {
  console.log('Service: Fetching all deals');
  // Simulate database latency
  await new Promise(resolve => setTimeout(resolve, 50));
  return deals;
};

export const getDealById = async (id: string): Promise<Deal | undefined> => {
  console.log(`Service: Fetching deal by ID ${id}`);
  await new Promise(resolve => setTimeout(resolve, 50));
  return deals.find(deal => deal.id === id);
};

export const createDeal = async (dealData: Omit<Deal, 'id'>): Promise<Deal> => {
  console.log('Service: Creating new deal', dealData);
  await new Promise(resolve => setTimeout(resolve, 100));
  const newDeal: Deal = {
    id: `d${nextId++}`,
    ...dealData,
  };
  deals.push(newDeal);
  return newDeal;
};

export const updateDeal = async (id: string, updateData: Partial<Deal>): Promise<Deal | undefined> => {
  console.log(`Service: Updating deal ${id}`, updateData);
  await new Promise(resolve => setTimeout(resolve, 100));
  const dealIndex = deals.findIndex(deal => deal.id === id);
  if (dealIndex === -1) {
    return undefined;
  }
  // Merge existing data with updateData
  deals[dealIndex] = { ...deals[dealIndex], ...updateData, id }; // Ensure ID is preserved
  return deals[dealIndex];
};

export const deleteDeal = async (id: string): Promise<number> => {
  console.log(`Service: Deleting deal ${id}`);
  await new Promise(resolve => setTimeout(resolve, 100));
  const initialLength = deals.length;
  deals = deals.filter(deal => deal.id !== id);
  return initialLength - deals.length; // Return number of deleted items
};
