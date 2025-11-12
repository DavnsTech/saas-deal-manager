import React, { createContext, useState, useContext, useCallback } from 'react';
import * as dealsApi from '../api/dealsApi';

const DealContext = createContext();

export const useDeals = () => useContext(DealContext);

export const DealProvider = ({ children }) => {
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchDeals = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await dealsApi.getDeals();
      setDeals(data);
    } catch (err) {
      setError(err.message || 'Failed to fetch deals');
      setDeals([]); // Clear deals on error
    } finally {
      setLoading(false);
    }
  }, []);

  const addDeal = useCallback(async (dealData) => {
    setLoading(true);
    setError(null);
    try {
      const newDeal = await dealsApi.createDeal(dealData);
      setDeals(prevDeals => [...prevDeals, newDeal]);
      return newDeal; // Return the created deal
    } catch (err) {
      setError(err.message || 'Failed to add deal');
      throw err; // Re-throw to allow component to handle it
    } finally {
      setLoading(false);
    }
  }, []);

  const updateDeal = useCallback(async (id, dealData) => {
    setLoading(true);
    setError(null);
    try {
      const updatedDeal = await dealsApi.updateDeal(id, dealData);
      setDeals(prevDeals =>
        prevDeals.map(deal => (deal.id === id ? updatedDeal : deal))
      );
      return updatedDeal;
    } catch (err) {
      setError(err.message || 'Failed to update deal');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteDeal = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    try {
      await dealsApi.deleteDeal(id);
      setDeals(prevDeals => prevDeals.filter(deal => deal.id !== id));
    } catch (err) {
      setError(err.message || 'Failed to delete deal');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <DealContext.Provider value={{ deals, loading, error, fetchDeals, addDeal, updateDeal, deleteDeal }}>
      {children}
    </DealContext.Provider>
  );
};
