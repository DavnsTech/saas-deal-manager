// TypeScript version of DealContext.tsx

import React, { createContext, useState, useContext, ReactNode } from 'react';

// Define the structure of a Deal object
interface Deal {
  id: number;
  name: string;
  stage: string;
  company?: string;
  contactPerson?: string;
  value?: number;
  expectedCloseDate?: string;
  createdAt: string;
  updatedAt: string;
}

// Define the shape of the context value
interface DealContextValue {
  deals: Deal[];
  setDeals: React.Dispatch<React.SetStateAction<Deal[]>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  error: string | null;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
  fetchDeals: () => Promise<void>; // Add fetchDeals to context
  addDeal: (newDeal: Deal) => void; // Add addDeal to context
  updateDealInContext: (updatedDeal: Deal) => void; // Add updateDealInContext
  deleteDealFromContext: (dealId: number) => void; // Add deleteDealFromContext
}

// Create the context with a default value that matches the interface
const DealContext = createContext<DealContextValue | undefined>(undefined);

interface DealProviderProps {
  children: ReactNode;
}

export const DealProvider = ({ children }: DealProviderProps) => {
  const [deals, setDeals] = useState<Deal[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Placeholder for API fetch function (you'd import from api/dealsApi.ts)
  const fetchDeals = async () => {
    setLoading(true);
    setError(null);
    try {
      // Assuming you have an import like: import { fetchDeals as apiFetchDeals } from '../api/dealsApi';
      // For this example, we'll simulate it:
      const mockDeals: Deal[] = [
        { id: 1, name: 'Tech Solutions Inc.', stage: 'Proposal', value: 15000, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
        { id: 2, name: 'Global Corp.', stage: 'Qualification', company: 'Global Corp.', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
      ];
      // const fetchedDeals = await apiFetchDeals();
      // setDeals(fetchedDeals);
      setDeals(mockDeals); // Using mock data for now
    } catch (err: any) {
      setError(err.message || 'Failed to fetch deals');
    } finally {
      setLoading(false);
    }
  };

  const addDeal = (newDeal: Deal) => {
    setDeals(prevDeals => [...prevDeals, newDeal]);
  };

  const updateDealInContext = (updatedDeal: Deal) => {
    setDeals(prevDeals =>
      prevDeals.map(deal => (deal.id === updatedDeal.id ? updatedDeal : deal))
    );
  };

  const deleteDealFromContext = (dealId: number) => {
    setDeals(prevDeals => prevDeals.filter(deal => deal.id !== dealId));
  };

  const value: DealContextValue = {
    deals,
    setDeals,
    loading,
    setLoading,
    error,
    setError,
    fetchDeals,
    addDeal,
    updateDealInContext,
    deleteDealFromContext,
  };

  return (
    <DealContext.Provider value={value}>
      {children}
    </DealContext.Provider>
  );
};

export const useDeals = (): DealContextValue => {
  const context = useContext(DealContext);
  if (context === undefined) {
    throw new Error('useDeals must be used within a DealProvider');
  }
  return context;
};
