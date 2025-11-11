import React, { createContext, useContext, useState, useEffect } from 'react';
import { fetchDeals, createDeal, updateDeal } from '../api/deals';

interface DealContextType {
  deals: Deal[];
  loading: boolean;
  error: string | null;
  createNewDeal: (dealData: Partial<Deal>) => Promise<Deal>;
  updateExistingDeal: (id: string, dealData: Partial<Deal>) => Promise<Deal>;
  filterDeals: (filters: { stage?: string; type?: 'B2B' | 'B2C' }) => void;
}

const DealContext = createContext<DealContextType | undefined>(undefined);

export const DealProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [deals, setDeals] = useState<Deal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<{ stage?: string; type?: 'B2B' | 'B2C' }>({});

  useEffect(() => {
    const loadDeals = async () => {
      try {
        setLoading(true);
        const data = await fetchDeals(filters);
        setDeals(data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch deals');
        console.error('Error fetching deals:', err);
      } finally {
        setLoading(false);
      }
    };

    loadDeals();
  }, [filters]);

  const createNewDeal = async (dealData: Partial<Deal>) => {
    const newDeal = await createDeal(dealData);
    setDeals(prev => [...prev, newDeal]);
    return newDeal;
  };

  const updateExistingDeal = async (id: string, dealData: Partial<Deal>) => {
    const updatedDeal = await updateDeal(id, dealData);
    setDeals(prev => prev.map(deal => 
      deal.id === id ? updatedDeal : deal
    ));
    return updatedDeal;
  };

  const filterDeals = (newFilters: { stage?: string; type?: 'B2B' | 'B2C' }) => {
    setFilters(newFilters);
  };

  return (
    <DealContext.Provider value={{
      deals,
      loading,
      error,
      createNewDeal,
      updateExistingDeal,
      filterDeals
    }}>
      {children}
    </DealContext.Provider>
  );
};

export const useDeals = () => {
  const context = useContext(DealContext);
  if (context === undefined) {
    throw new Error('useDeals must be used within a DealProvider');
  }
  return context;
};
