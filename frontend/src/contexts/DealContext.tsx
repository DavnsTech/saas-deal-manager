import React, { createContext, useContext, useState, useEffect } from 'react';
import { Deal } from '../types';
import { dealsApi } from '../api/dealsApi';

interface DealContextType {
  deals: Deal[];
  loading: boolean;
  error: string | null;
  fetchDeals: () => Promise<void>;
  createDeal: (deal: Partial<Deal>) => Promise<void>;
  updateDeal: (id: number, deal: Partial<Deal>) => Promise<void>;
  deleteDeal: (id: number) => Promise<void>;
}

const DealContext = createContext<DealContextType | undefined>(undefined);

export const useDeals = () => {
  const context = useContext(DealContext);
  if (!context) {
    throw new Error('useDeals must be used within DealProvider');
  }
  return context;
};

export const DealProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [deals, setDeals] = useState<Deal[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchDeals = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await dealsApi.fetchDeals();
      setDeals(response.data);
    } catch (err) {
      setError('Failed to fetch deals');
    } finally {
      setLoading(false);
    }
  };

  const createDeal = async (deal: Partial<Deal>) => {
    try {
      const response = await dealsApi.createDeal(deal);
      setDeals([...deals, response.data]);
    } catch (err) {
      setError('Failed to create deal');
    }
  };

  const updateDeal = async (id: number, deal: Partial<Deal>) => {
    try {
      const response = await dealsApi.updateDeal(id, deal);
      setDeals(deals.map(d => d.id === id ? response.data : d));
    } catch (err) {
      setError('Failed to update deal');
    }
  };

  const deleteDeal = async (id: number) => {
    try {
      await dealsApi.deleteDeal(id);
      setDeals(deals.filter(d => d.id !== id));
    } catch (err) {
      setError('Failed to delete deal');
    }
  };

  useEffect(() => {
    fetchDeals();
  }, []);

  return (
    <DealContext.Provider value={{ deals, loading, error, fetchDeals, createDeal, updateDeal, deleteDeal }}>
      {children}
    </DealContext.Provider>
  );
};
