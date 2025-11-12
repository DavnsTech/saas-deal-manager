import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { Deal } from '../types';
import * as dealsApi from '../api/dealsApi';

interface DealContextType {
  deals: Deal[];
  loading: boolean;
  error: string | null;
  fetchDeals: () => Promise<void>;
  addDeal: (dealData: Omit<Deal, 'id'>) => Promise<void>;
  updateDeal: (id: string, dealData: Partial<Deal>) => Promise<void>;
  deleteDeal: (id: string) => Promise<void>;
  getDealById: (id: string) => Promise<Deal | undefined>;
}

const DealContext = createContext<DealContextType | undefined>(undefined);

export const DealProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [deals, setDeals] = useState<Deal[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDeals = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await dealsApi.getDeals();
      setDeals(data);
    } catch (err) {
      setError('Failed to fetch deals.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getDealById = async (id: string): Promise<Deal | undefined> => {
    try {
      return await dealsApi.getDealById(id);
    } catch (err) {
      console.error(`Failed to fetch deal ${id}:`, err);
      return undefined;
    }
  };

  const addDeal = async (dealData: Omit<Deal, 'id'>) => {
    try {
      const newDeal = await dealsApi.createDeal(dealData);
      setDeals((prevDeals) => [...prevDeals, newDeal]);
    } catch (err) {
      console.error('Failed to add deal:', err);
      throw err; // Re-throw to be caught by the component
    }
  };

  const updateDeal = async (id: string, dealData: Partial<Deal>) => {
    try {
      const updatedDeal = await dealsApi.updateDeal(id, dealData);
      setDeals((prevDeals) =>
        prevDeals.map((deal) => (deal.id === id ? updatedDeal : deal))
      );
    } catch (err) {
      console.error(`Failed to update deal ${id}:`, err);
      throw err; // Re-throw to be caught by the component
    }
  };

  const deleteDeal = async (id: string) => {
    try {
      await dealsApi.deleteDeal(id);
      setDeals((prevDeals) => prevDeals.filter((deal) => deal.id !== id));
    } catch (err) {
      console.error(`Failed to delete deal ${id}:`, err);
      throw err; // Re-throw to be caught by the component
    }
  };

  useEffect(() => {
    fetchDeals();
  }, []);

  return (
    <DealContext.Provider
      value={{
        deals,
        loading,
        error,
        fetchDeals,
        addDeal,
        updateDeal,
        deleteDeal,
        getDealById,
      }}
    >
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
