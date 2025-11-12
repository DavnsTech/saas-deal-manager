import React, { createContext, useState, useContext, useEffect } from 'react';
import * as dealsApi from '../api/dealsApi';

const DealContext = createContext();

export const useDeals = () => useContext(DealContext);

export const DealProvider = ({ children }) => {
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDeals = async () => {
    setLoading(true);
    setError(null); // Clear previous errors
    try {
      const data = await dealsApi.getDeals();
      setDeals(data);
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to fetch deals.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDeals();
  }, []);

  const addDeal = async (dealData) => {
    try {
      const newDeal = await dealsApi.createDeal(dealData);
      // Optimistically update state or re-fetch
      setDeals(prevDeals => [...prevDeals, newDeal]);
      return newDeal;
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to create deal.');
      throw err; // Re-throw for component to handle if needed
    }
  };

  const updateDealContext = async (id, dealData) => {
    try {
      const updatedDeal = await dealsApi.updateDeal(id, dealData);
      setDeals(prevDeals => prevDeals.map(deal => (deal.id === id ? updatedDeal : deal)));
      return updatedDeal;
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to update deal.');
      throw err;
    }
  };

  const deleteDealFromContext = async (id) => {
    try {
      await dealsApi.deleteDeal(id);
      setDeals(prevDeals => prevDeals.filter(deal => deal.id !== id));
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to delete deal.');
      throw err;
    }
  };

  // Provide a way to manually refresh deals if needed
  const refreshDeals = () => {
    fetchDeals();
  };

  return (
    <DealContext.Provider value={{ deals, loading, error, addDeal, updateDealContext, deleteDealFromContext, refreshDeals }}>
      {children}
    </DealContext.Provider>
  );
};
