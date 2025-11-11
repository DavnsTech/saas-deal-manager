import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { fetchDeals, createDeal, updateDeal, deleteDeal, fetchDealById } from '../api/dealsApi';
import { Deal } from '../types'; // Assuming 'Deal' type is defined in ../types

interface DealContextType {
  deals: Deal[];
  loading: boolean;
  error: string | null;
  selectedDeal: Deal | null;
  fetchDeals: () => Promise<void>;
  fetchDeal: (id: string) => Promise<Deal | null>;
  addDeal: (dealData: Omit<Deal, 'id'>) => Promise<Deal | null>;
  editDeal: (id: string, dealData: Partial<Deal>) => Promise<Deal | null>;
  removeDeal: (id: string) => Promise<boolean>;
  setSelectedDeal: (deal: Deal | null) => void;
}

const DealContext = createContext<DealContextType | undefined>(undefined);

interface DealProviderProps {
  children: ReactNode;
}

export const DealProvider: React.FC<DealProviderProps> = ({ children }) => {
  const [deals, setDeals] = useState<Deal[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedDeal, setSelectedDeal] = useState<Deal | null>(null);

  const fetchAllDeals = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchDeals();
      setDeals(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
      setDeals([]); // Clear deals on error
    } finally {
      setLoading(false);
    }
  };

  const fetchSingleDeal = async (id: string): Promise<Deal | null> => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchDealById(id);
      // If we are fetching a single deal, and it's currently selected, update it
      if (selectedDeal && selectedDeal.id === id) {
          setSelectedDeal(data);
      }
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const addDeal = async (dealData: Omit<Deal, 'id'>): Promise<Deal | null> => {
    setLoading(true);
    setError(null);
    try {
      const newDeal = await createDeal(dealData);
      setDeals(prevDeals => [...prevDeals, newDeal]); // Optimistic UI update
      return newDeal;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const editDeal = async (id: string, dealData: Partial<Deal>): Promise<Deal | null> => {
    setLoading(true);
    setError(null);
    try {
      const updatedDeal = await updateDeal(id, dealData);
      setDeals(prevDeals =>
        prevDeals.map(deal => (deal.id === id ? updatedDeal : deal))
      );
      if (selectedDeal && selectedDeal.id === id) {
        setSelectedDeal(updatedDeal); // Update selected deal if it's the one being edited
      }
      return updatedDeal;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const removeDeal = async (id: string): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      await deleteDeal(id);
      setDeals(prevDeals => prevDeals.filter(deal => deal.id !== id));
      if (selectedDeal && selectedDeal.id === id) {
        setSelectedDeal(null); // Clear selected deal if it's the one being deleted
      }
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Initial fetch when the component mounts
  useEffect(() => {
    fetchAllDeals();
  }, []);

  const contextValue: DealContextType = {
    deals,
    loading,
    error,
    selectedDeal,
    fetchDeals: fetchAllDeals,
    fetchDeal: fetchSingleDeal,
    addDeal,
    editDeal,
    removeDeal,
    setSelectedDeal,
  };

  return (
    <DealContext.Provider value={contextValue}>
      {children}
    </DealContext.Provider>
  );
};

export const useDealContext = (): DealContextType => {
  const context = useContext(DealContext);
  if (!context) {
    throw new Error('useDealContext must be used within a DealProvider');
  }
  return context;
};
