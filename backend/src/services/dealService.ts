// Placeholder for deal service logic, e.g., business logic for deals
export const calculateDealValue = (deals: any[]) => {
  return deals.reduce((sum, deal) => sum + (deal.amount || 0), 0);
};
