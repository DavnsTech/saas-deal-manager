import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Deal, User } from '../types';
import { dealsApi } from '../api/dealsApi';

interface DealContextType {
  deals: Deal[];
  loading: boolean;
  error: string | null;
  fetchDeals: () => Promise<void>;
  addDeal: (dealData: Omit<Deal, 'id' | 'createdAt' | 'updatedAt' | 'ownerId'>) => Promise<Deal | undefined>;
  updateDeal: (id: string, updateData: Partial<Deal>) => Promise<Deal | undefined>;
  deleteDeal: (id: string) => Promise<boolean>;
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
  login: (credentials: any) => Promise<boolean>;
  register: (userData: any) => Promise<boolean>;
  logout: () => void;
}

const DealContext = createContext<DealContextType | undefined>(undefined);

export const useDeals = () => {
  const context = useContext(DealContext);
  if (!context) {
    throw new Error('useDeals must be used within a DealProvider');
  }
  return context;
};

interface DealProviderProps {
  children: ReactNode;
}

export const DealProvider: React.FC<DealProviderProps> = ({ children }) => {
  const [deals, setDeals] = useState<Deal[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  // Load user and token from localStorage on initial load
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const storedUser = localStorage.getItem('currentUser');
    if (token && storedUser) {
      try {
        const user = JSON.parse(storedUser);
        setCurrentUser(user);
        // Optionally, re-fetch deals if user is already logged in
        fetchDeals();
      } catch (e) {
        console.error("Failed to parse stored user data:", e);
        logout(); // Clear invalid data
      }
    }
  }, []);


  const fetchDeals = async () => {
    setLoading(true);
    setError(null);
    try {
      const fetchedDeals = await dealsApi.getAllDeals();
      // Ensure dates are parsed correctly if coming from API as strings
      const parsedDeals = fetchedDeals.map((deal: any) => ({
        ...deal,
        createdAt: new Date(deal.createdAt),
        updatedAt: new Date(deal.updatedAt),
      }));
      setDeals(parsedDeals);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch deals');
      // Handle unauthorized access (e.g., redirect to login)
      if (err.message.includes('401') || err.message.includes('403')) {
        logout();
      }
    } finally {
      setLoading(false);
    }
  };

  const addDeal = async (dealData: Omit<Deal, 'id' | 'createdAt' | 'updatedAt' | 'ownerId'>) => {
    setLoading(true);
    setError(null);
    try {
      const newDeal = await dealsApi.createDeal(dealData);
      // Ensure dates are parsed correctly
      const parsedDeal = {
        ...newDeal,
        createdAt: new Date(newDeal.createdAt),
        updatedAt: new Date(newDeal.updatedAt),
      };
      setDeals([...deals, parsedDeal]);
      return parsedDeal;
    } catch (err: any) {
      setError(err.message || 'Failed to add deal');
      if (err.message.includes('401') || err.message.includes('403')) {
        logout();
      }
      return undefined;
    } finally {
      setLoading(false);
    }
  };

  const updateDeal = async (id: string, updateData: Partial<Deal>) => {
    setLoading(true);
    setError(null);
    try {
      const updatedDeal = await dealsApi.updateDeal(id, updateData);
      // Ensure dates are parsed correctly
      const parsedDeal = {
        ...updatedDeal,
        createdAt: new Date(updatedDeal.createdAt),
        updatedAt: new Date(updatedDeal.updatedAt),
      };
      setDeals(deals.map(deal => (deal.id === id ? parsedDeal : deal)));
      return parsedDeal;
    } catch (err: any) {
      setError(err.message || 'Failed to update deal');
      if (err.message.includes('401') || err.message.includes('403')) {
        logout();
      }
      return undefined;
    } finally {
      setLoading(false);
    }
  };

  const deleteDeal = async (id: string): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      await dealsApi.deleteDeal(id);
      setDeals(deals.filter(deal => deal.id !== id));
      return true;
    } catch (err: any) {
      setError(err.message || 'Failed to delete deal');
      if (err.message.includes('401') || err.message.includes('403')) {
        logout();
      }
      return false;
    } finally {
      setLoading(false);
    }
  };

  const login = async (credentials: any): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      const response = await dealsApi.login(credentials);
      localStorage.setItem('authToken', response.token);
      localStorage.setItem('currentUser', JSON.stringify(response.user));
      setCurrentUser(response.user);
      await fetchDeals(); // Fetch deals after successful login
      return true;
    } catch (err: any) {
      setError(err.message || 'Login failed');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData: any): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      const response = await dealsApi.register(userData);
      // Optionally auto-login after registration, or redirect to login page
      console.log('Registration successful:', response);
      return true;
    } catch (err: any) {
      setError(err.message || 'Registration failed');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('currentUser');
    setCurrentUser(null);
    setDeals([]); // Clear deals from state
    setError(null); // Clear any previous errors
  };

  return (
    <DealContext.Provider
      value={{
        deals,
        loading,
        error,
        fetchDeals,
        addDeal,
        updateDeal,
        deleteDeal,
        currentUser,
        setCurrentUser,
        login,
        register,
        logout,
      }}
    >
      {children}
    </DealContext.Provider>
  );
};
