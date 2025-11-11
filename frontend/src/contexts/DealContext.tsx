import React, { createContext, useState, useContext, ReactNode, useMemo, useCallback } from 'react';
import { Deal } from '../types';
import { getDeals, createDeal, updateDeal as apiUpdateDeal, deleteDeal as apiDeleteDeal } from '../api/dealsApi';

interface DealContextType {
  deals: Deal[];
  loading: boolean;
  error: string | null;
  fetchDeals: () => Promise<void>;
  addDeal: (dealData: Omit<Deal, 'id'>) => Promise<void>;
  updateDeal: (deal: Deal) => Promise<void>;
  deleteDeal: (dealId: string) => Promise<void>;
}

const DealContext = createContext<DealContextType | undefined>(undefined);

interface DealProviderProps {
  children: ReactNode;
}

export const DealProvider: React.FC<DealProviderProps> = ({ children }) => {
  const [deals, setDeals] = useState<Deal[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDeals = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const fetchedDeals = await getDeals();
      setDeals(fetchedDeals);
    } catch (err) {
      console.error("Failed to fetch deals:", err);
      setError("Failed to load deals.");
    } finally {
      setLoading(false);
    }
  }, []); // No dependencies, this function itself doesn't change

  const addDeal = useCallback(async (dealData: Omit<Deal, 'id'>) => {
    setError(null); // Clear previous errors for this specific operation
    try {
      const newDeal = await createDeal(dealData);
      setDeals(prevDeals => [...prevDeals, newDeal]);
    } catch (err) {
      console.error("Failed to add deal:", err);
      setError("Failed to add deal.");
      throw err; // Re-throw to allow component to potentially show a specific error
    }
  }, []);

  const updateDeal = useCallback(async (deal: Deal) => {
    setError(null);
    try {
      await apiUpdateDeal(deal); // Assuming apiUpdateDeal returns the updated deal or void
      setDeals(prevDeals => prevDeals.map(d => (d.id === deal.id ? deal : d)));
    } catch (err) {
      console.error("Failed to update deal:", err);
      setError("Failed to update deal.");
      throw err;
    }
  }, []);

  const deleteDeal = useCallback(async (dealId: string) => {
    setError(null);
    try {
      await apiDeleteDeal(dealId);
      setDeals(prevDeals => prevDeals.filter(d => d.id !== dealId));
    } catch (err) {
      console.error("Failed to delete deal:", err);
      setError("Failed to delete deal.");
      throw err;
    }
  }, []);

  // Memoize the context value to prevent unnecessary re-renders of consumers
  const contextValue = useMemo(() => ({
    deals,
    loading,
    error,
    fetchDeals,
    addDeal,
    updateDeal,
    deleteDeal,
  }), [deals, loading, error, fetchDeals, addDeal, updateDeal, deleteDeal]);

  return (
    <DealContext.Provider value={contextValue}>
      {children}
    </DealContext.Provider>
  );
};

export const useDeals = (): DealContextType => {
  const context = useContext(DealContext);
  if (context === undefined) {
    throw new Error('useDeals must be used within a DealProvider');
  }
  return context;
};
