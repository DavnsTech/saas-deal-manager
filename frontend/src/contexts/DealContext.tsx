import React, { createContext, useState, useContext, useCallback, ReactNode } from 'react';
import * as dealsApi from '../api/dealsApi';

// Define the Deal type based on your backend model or API response
interface Deal {
  id: number;
  name: string;
  description?: string;
  value: number;
  stage: string;
  createdAt: string;
  updatedAt: string;
}

// Define the context type
interface DealContextType {
  deals: Deal[];
  loading: boolean;
  error: string | null;
  fetchDeals: () => Promise<void>;
  addDeal: (dealData: Omit<Deal, 'id' | 'createdAt' | 'updatedAt'>) => Promise<Deal>;
  updateDeal: (id: number, dealData: Partial<Deal>) => Promise<Deal>;
  deleteDeal: (id: number) => Promise<void>;
}

const DealContext = createContext<DealContextType | undefined>(undefined);

export const useDeals = (): DealContextType => {
  const context = useContext(DealContext);
  if (!context) {
    throw new Error('useDeals must be used within a DealProvider');
  }
  return context;
};

interface DealProviderProps {
  children: ReactNode;
}

export const DealProvider: React.FC<DealProviderProps> = ({ children }) => {
  const [deals, setDeals] = useState<Deal[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchDeals = useCallback(async (): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      const data = await dealsApi.getDeals();
      setDeals(data);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch deals');
      setDeals([]); // Clear deals on error
    } finally {
      setLoading(false);
    }
  }, []);

  const addDeal = useCallback(async (dealData: Omit<Deal, 'id' | 'createdAt' | 'updatedAt'>): Promise<Deal> => {
    setLoading(true);
    setError(null);
    try {
      const newDeal = await dealsApi.createDeal(dealData);
      setDeals(prevDeals => [...prevDeals, newDeal]);
      return newDeal; // Return the created deal
    } catch (err: any) {
      setError(err.message || 'Failed to add deal');
      throw err; // Re-throw to allow component to handle it
    } finally {
      setLoading(false);
    }
  }, []);

  const updateDeal = useCallback(async (id: number, dealData: Partial<Deal>): Promise<Deal> => {
    setLoading(true);
    setError(null);
    try {
      const updatedDeal = await dealsApi.updateDeal(id, dealData);
      setDeals(prevDeals =>
        prevDeals.map(deal => (deal.id === id ? updatedDeal : deal))
      );
      return updatedDeal;
    } catch (err: any) {
      setError(err.message || 'Failed to update deal');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteDeal = useCallback(async (id: number): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      await dealsApi.deleteDeal(id);
      setDeals(prevDeals => prevDeals.filter(deal => deal.id !== id));
    } catch (err: any) {
      setError(err.message || 'Failed to delete deal');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <DealContext.Provider value={{ deals, loading, error, fetchDeals, addDeal, updateDeal, deleteDeal }}>
      {children}
    </DealContext.Provider>
  );
};
