import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Deal, CreateDealPayload } from '../types';
import { fetchDeals as apiFetchDeals, createDeal as apiCreateDeal, getDealById as apiGetDealById } from '../api/dealsApi'; // Assuming these functions exist and are typed

interface DealContextType {
  deals: Deal[];
  loading: boolean;
  error: string | null;
  fetchDeals: () => Promise<void>;
  createDeal: (dealData: CreateDealPayload) => Promise<Deal | null>;
  getDealById: (dealId: string) => Promise<Deal | null>;
  // Add other context functions like updateDeal, deleteDeal if needed
}

const DealContext = createContext<DealContextType | undefined>(undefined);

interface DealProviderProps {
  children: ReactNode;
}

export const DealProvider: React.FC<DealProviderProps> = ({ children }) => {
  const [deals, setDeals] = useState<Deal[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchDeals = async () => {
    setLoading(true);
    setError(null);
    try {
      const fetchedDeals = await apiFetchDeals();
      setDeals(fetchedDeals);
    } catch (err: any) {
      setError(`Failed to fetch deals: ${err.message || 'An unknown error occurred'}`);
      console.error('Fetch deals error:', err);
    } finally {
      setLoading(false);
    }
  };

  const createDeal = async (dealData: CreateDealPayload): Promise<Deal | null> => {
    setLoading(true);
    setError(null);
    try {
      const newDeal = await apiCreateDeal(dealData);
      // Optimistically update state or re-fetch
      setDeals(prevDeals => [...prevDeals, newDeal]);
      return newDeal;
    } catch (err: any) {
      setError(`Failed to create deal: ${err.message || 'An unknown error occurred'}`);
      console.error('Create deal error:', err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const getDealById = async (dealId: string): Promise<Deal | null> => {
    setLoading(true);
    setError(null);
    try {
      const deal = await apiGetDealById(dealId);
      return deal;
    } catch (err: any) {
      setError(`Failed to fetch deal ${dealId}: ${err.message || 'An unknown error occurred'}`);
      console.error(`Fetch deal ${dealId} error:`, err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return (
    <DealContext.Provider value={{ deals, loading, error, fetchDeals, createDeal, getDealById }}>
      {children}
    </DealContext.Provider>
  );
};

export const useDealContext = () => {
  const context = useContext(DealContext);
  if (context === undefined) {
    throw new Error('useDealContext must be used within a DealProvider');
  }
  return context;
};
