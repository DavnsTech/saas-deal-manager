// This is a placeholder for DealContext.js.
// If you are using TS, you'll want to create DealContext.tsx.
// For now, it will be a basic JS context setup.

import React, { createContext, useState, useContext } from 'react';

const DealContext = createContext();

export const DealProvider = ({ children }) => {
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const value = {
    deals,
    setDeals,
    loading,
    setLoading,
    error,
    setError,
  };

  return (
    <DealContext.Provider value={value}>
      {children}
    </DealContext.Provider>
  );
};

export const useDeals = () => {
  const context = useContext(DealContext);
  if (!context) {
    throw new Error('useDeals must be used within a DealProvider');
  }
  return context;
};
