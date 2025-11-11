// Placeholder for business logic if needed in the future
export const calculateTotalValue = (deals: any[]) => {
  return deals.reduce((sum, deal) => sum + parseFloat(deal.montant || 0), 0);
};
