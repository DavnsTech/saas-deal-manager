import React, { createContext, useState, useContext, useEffect } from 'react';
import * as dealsApi from '../api/dealsApi';

// Create a context for managing deal state
const DealContext = createContext();

/**
 * Custom hook to consume the DealContext.
 * Provides access to deals, loading state, error state, and CRUD operations.
 * @returns {Object} The context value containing deals, loading, error, and functions.
 */
export const useDeals = () => useContext(DealContext);

/**
 * Provider component for the DealContext.
 * Fetches deals on mount and provides functions for adding, updating, deleting,
 * and refreshing deals to its children.
 * @param {Object} props - Component props.
 * @param {React.ReactNode} props.children - The child components to be wrapped by the provider.
 */
export const DealProvider = ({ children }) => {
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /**
   * Fetches all deals from the API and updates the state.
   */
  const fetchDeals = async () => {
    setLoading(true);
    setError(null); // Clear previous errors
    try {
      const data = await dealsApi.getDeals();
      setDeals(data);
    } catch (err) {
      setError(err.message || 'Failed to fetch deals.');
    } finally {
      setLoading(false);
    }
  };

  // Fetch deals when the component mounts
  useEffect(() => {
    fetchDeals();
  }, []);

  /**
   * Adds a new deal to the system.
   * @param {Object} dealData - The data for the new deal.
   * @returns {Promise<Object>} The newly created deal object.
   * @throws {Error} If creating the deal fails.
   */
  const addDeal = async (dealData) => {
    try {
      const newDeal = await dealsApi.createDeal(dealData);
      // Update state by adding the new deal
      setDeals(prevDeals => [...prevDeals, newDeal]);
      return newDeal;
    } catch (err) {
      setError(err.message || 'Failed to create deal.');
      throw err; // Re-throw for component to handle if needed
    }
  };

  /**
   * Updates an existing deal in the system.
   * @param {string} id - The ID of the deal to update.
   * @param {Object} dealData - The updated data for the deal.
   * @returns {Promise<Object>} The updated deal object.
   * @throws {Error} If updating the deal fails.
   */
  const updateDealContext = async (id, dealData) => {
    try {
      const updatedDeal = await dealsApi.updateDeal(id, dealData);
      // Update state by mapping over deals and replacing the updated one
      setDeals(prevDeals => prevDeals.map(deal => (deal.id === id ? updatedDeal : deal)));
      return updatedDeal;
    } catch (err) {
      setError(err.message || 'Failed to update deal.');
      throw err;
    }
  };

  /**
   * Deletes a deal from the system.
   * @param {string} id - The ID of the deal to delete.
   * @throws {Error} If deleting the deal fails.
   */
  const deleteDealFromContext = async (id) => {
    try {
      await dealsApi.deleteDeal(id);
      // Update state by filtering out the deleted deal
      setDeals(prevDeals => prevDeals.filter(deal => deal.id !== id));
    } catch (err) {
      setError(err.message || 'Failed to delete deal.');
      throw err;
    }
  };

  // Provide a way to manually refresh deals if needed (e.g., after external changes)
  const refreshDeals = () => {
    fetchDeals();
  };

  // Value provided by the context
  const contextValue = {
    deals,
    loading,
    error,
    addDeal,
    updateDeal: updateDealContext, // Alias for clarity
    deleteDeal: deleteDealFromContext, // Alias for clarity
    refreshDeals,
  };

  return (
    <DealContext.Provider value={contextValue}>
      {children}
    </DealContext.Provider>
  );
};
