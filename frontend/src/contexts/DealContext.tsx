import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { fetchDeals, fetchDealById, createDeal, updateDeal, deleteDeal } from '../api/dealsApi';
import { Deal } from '../types';

interface DealContextType {
  deals: Deal[];
  currentDeal: Deal | null;
  loading: boolean;
  error: string | null;
  loadDeals: () => Promise<void>;
  loadDeal: (id: string) => Promise<void>;
  addDeal: (deal: Omit<Deal, '_id'>) => Promise<void>;
  editDeal: (id: string, deal: Partial<Deal>) => Promise<void>;
  removeDeal: (id: string) => Promise<void>;
  clearError: () => void;
}

const DealContext = createContext<DealContextType | undefined>(undefined);

export const DealProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [deals, setDeals] = useState<Deal[]>([]);
  const [currentDeal, setCurrentDeal] = useState<Deal | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const clearError = () => setError(null);

  const loadDeals = async () => {
    try {
      setLoading(true);
      const data = await fetchDeals();
      setDeals(data);
      setError(null);
    } catch (err) {
      setError('Failed to load deals');
      console.error('Error loading deals:', err);
    } finally {
      setLoading(false);
    }
  };

  const loadDeal = async (id: string) => {
    try {
      setLoading(true);
      const data = await fetchDealById(id);
      setCurrentDeal(data);
      setError(null);
    } catch (err) {
      setError('Failed to load deal details');
      console.error('Error loading deal:', err);
    } finally {
      setLoading(false);
    }
  };

  const addDeal = async (deal: Omit<Deal, '_id'>) => {
    try {
      setLoading(true);
      const newDeal = await createDeal(deal);
      setDeals(prev => [...prev, newDeal]);
      setError(null);
    } catch (err) {
      setError('Failed to create deal');
      console.error('Error creating deal:', err);
    } finally {
      setLoading(false);
    }
  };

  const editDeal = async (id: string, deal: Partial<Deal>) => {
    try {
      setLoading(true);
      const updatedDeal = await updateDeal(id, deal);
      setDeals(prev => prev.map(d => (d._id === id ? updatedDeal : d)));
      if (currentDeal?._id === id) {
        setCurrentDeal(updatedDeal);
      }
      setError(null);
    } catch (err) {
      setError('Failed to update deal');
      console.error('Error updating deal:', err);
    } finally {
      setLoading(false);
    }
  };

  const removeDeal = async (id: string) => {
    try {
      setLoading(true);
      await deleteDeal(id);
      setDeals(prev => prev.filter(d => d._id !== id));
      if (currentDeal?._id === id) {
        setCurrentDeal(null);
      }
      setError(null);
    } catch (err) {
      setError('Failed to delete deal');
      console.error('Error deleting deal:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <DealContext.Provider
      value={{
        deals,
        currentDeal,
        loading,
        error,
        loadDeals,
        loadDeal,
        addDeal,
        editDeal,
        removeDeal,
        clearError
      }}
    >
      {children}
    </DealContext.Provider>
  );
};

export const useDealContext = () => {
  const context = useContext(DealContext);
  if (!context) {
    throw new Error('useDealContext must be used within a DealProvider');
  }
  return context;
};
