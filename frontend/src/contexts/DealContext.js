import React, { createContext, useContext, useState, useEffect } from 'react';
import { fetchDeals, createDeal, updateDeal, deleteDeal, fetchDealById } from '../api/dealsApi';

const DealContext = createContext();

export const useDeals = () => {
  const context = useContext(DealContext);
  if (!context) {
    throw new Error('useDeals must be used within a DealContextProvider');
  }
  return context;
};

function DealContextProvider({ children }) {
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadDeals = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchDeals();
      setDeals(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getDealById = async (id) => {
    try {
      return await fetchDealById(id);
    } catch (err) {
      setError(err.message);
      return null;
    }
  };

  const addDeal = async (dealData) => {
    try {
      const newDeal = await createDeal(dealData);
      setDeals([...deals, newDeal]);
      return newDeal;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const editDeal = async (id, dealData) => {
    try {
      const updatedDeal = await updateDeal(id, dealData);
      setDeals(deals.map(deal => deal.id === id ? updatedDeal : deal));
      return updatedDeal;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const removeDeal = async (id) => {
    try {
      await deleteDeal(id);
      setDeals(deals.filter(deal => deal.id !== id));
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  useEffect(() => {
    loadDeals();
  }, []);

  const value = {
    deals,
    loading,
    error,
    loadDeals,
    getDealById,
    addDeal,
    editDeal,
    removeDeal,
  };

  return (
    <DealContext.Provider value={value}>
      {children}
    </DealContext.Provider>
  );
}

export default DealContextProvider;
