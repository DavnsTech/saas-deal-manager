import React, { createContext, useState, useContext, useEffect } from 'react';
import * as dealsApi from '../api/dealsApi';

const DealContext = createContext();

export const useDeals = () => useContext(DealContext);

export const DealProvider = ({ children }) => {
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDeals = async () => {
      try {
        setLoading(true);
        const data = await dealsApi.getDeals();
        setDeals(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchDeals();
  }, []);

  const addDeal = async (dealData) => {
    try {
      const newDeal = await dealsApi.createDeal(dealData);
      setDeals([...deals, newDeal]);
      return newDeal;
    } catch (err) {
      setError(err);
      throw err;
    }
  };

  const updateDealContext = async (id, dealData) => {
    try {
      const updatedDeal = await dealsApi.updateDeal(id, dealData);
      setDeals(deals.map(deal => (deal.id === id ? updatedDeal : deal)));
      return updatedDeal;
    } catch (err) {
      setError(err);
      throw err;
    }
  };

  const deleteDealFromContext = async (id) => {
    try {
      await dealsApi.deleteDeal(id);
      setDeals(deals.filter(deal => deal.id !== id));
    } catch (err) {
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
