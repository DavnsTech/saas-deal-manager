import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import * as dealsApi from '../api/dealsApi';
import { Deal } from '../types';

interface DealContextType {
  deals: Deal[];
  loading: boolean;
  error: Error | null;
  addDeal: (dealData: Omit<Deal, 'id'>) => Promise<Deal>;
  updateDealContext: (id: string, dealData: Partial<Deal>) => Promise<Deal>;
  deleteDealFromContext: (id: string) => Promise<void>;
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
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchDeals = async (): Promise<void> => {
      try {
        setLoading(true);
        const data = await dealsApi.getDeals();
        setDeals(data);
      } catch (err: any) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchDeals();
  }, []);

  const addDeal = async (dealData: Omit<Deal, 'id'>): Promise<Deal> => {
    try {
      const newDeal = await dealsApi.createDeal(dealData);
      setDeals([...deals, newDeal]);
      return newDeal;
    } catch (err: any) {
      setError(err);
      throw err;
    }
  };

  const updateDealContext = async (id: string, dealData: Partial<Deal>): Promise<Deal> => {
    try {
      const updatedDeal = await dealsApi.updateDeal(id, dealData);
      setDeals(deals.map(deal => (deal.id === id ? updatedDeal : deal)));
      return updatedDeal;
    } catch (err: any) {
      setError(err);
      throw err;
    }
  };

  const deleteDealFromContext = async (id: string): Promise<void> => {
    try {
      await dealsApi.deleteDeal(id);
      setDeals(deals.filter(deal => deal.id !== id));
    } catch (err: any) {
      setError(err);
      throw err;
    }
  };

  return (
    <DealContext.Provider value={{ deals, loading, error, addDeal, updateDealContext, deleteDealFromContext }}>
      {children}
    </DealContext.Provider>
  );
};
