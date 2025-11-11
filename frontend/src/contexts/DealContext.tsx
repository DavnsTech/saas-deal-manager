import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import * as dealsApi from '../api/dealsApi';
import { Deal } from '../types'; // Assuming Deal type is defined here
import { useAuth } from './AuthContext'; // Assuming an AuthContext provides user and token

interface DealContextType {
    deals: Deal[];
    loading: boolean;
    error: string | null;
    fetchDeals: () => Promise<void>;
    addDeal: (dealData: Omit<Deal, 'id'>) => Promise<Deal | null>;
    editDeal: (id: number, dealData: Partial<Omit<Deal, 'id'>>) => Promise<Deal | null>;
    removeDeal: (id: number) => Promise<boolean>;
}

const DealContext = createContext<DealContextType | undefined>(undefined);

interface DealProviderProps {
    children: ReactNode;
}

export const DealProvider: React.FC<DealProviderProps> = ({ children }) => {
    const [deals, setDeals] = useState<Deal[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const { user, isAuthenticated } = useAuth(); // Get user info and auth status

    const fetchDeals = async (): Promise<void> => {
        if (!isAuthenticated) {
            setDeals([]); // Clear deals if not authenticated
            return;
        }
        setLoading(true);
        setError(null);
        try {
            const data = await dealsApi.fetchDeals();
            setDeals(data);
        } catch (err: any) {
            setError(err.message || 'Failed to fetch deals.');
        } finally {
            setLoading(false);
        }
    };

    const addDeal = async (dealData: Omit<Deal, 'id'>): Promise<Deal | null> => {
        if (!isAuthenticated) return null;
        setError(null);
        try {
            const newDeal = await dealsApi.createDeal(dealData);
            // Optimistic UI update or refetch
            setDeals((prevDeals) => [...prevDeals, newDeal]);
            return newDeal;
        } catch (err: any) {
            setError(err.message || 'Failed to add deal.');
            return null;
        }
    };

    const editDeal = async (id: number, dealData: Partial<Omit<Deal, 'id'>>): Promise<Deal | null> => {
        if (!isAuthenticated) return null;
        setError(null);
        try {
            const updatedDeal = await dealsApi.updateDeal(id, dealData);
            // Optimistic UI update or refetch
            setDeals((prevDeals) =>
                prevDeals.map((deal) => (deal.id === id ? updatedDeal : deal))
            );
            return updatedDeal;
        } catch (err: any) {
            setError(err.message || `Failed to update deal ${id}.`);
            return null;
        }
    };

    const removeDeal = async (id: number): Promise<boolean> => {
        if (!isAuthenticated) return false;
        setError(null);
        try {
            await dealsApi.deleteDeal(id);
            // Optimistic UI update or refetch
            setDeals((prevDeals) => prevDeals.filter((deal) => deal.id !== id));
            return true;
        } catch (err: any) {
            setError(err.message || `Failed to delete deal ${id}.`);
            return false;
        }
    };

    // Fetch deals when the component mounts and user is authenticated
    useEffect(() => {
        fetchDeals();
    }, [isAuthenticated, user]); // Refetch if auth state changes

    return (
        <DealContext.Provider value={{ deals, loading, error, fetchDeals, addDeal, editDeal, removeDeal }}>
            {children}
        </DealContext.Provider>
    );
};

export const useDeal = (): DealContextType => {
    const context = useContext(DealContext);
    if (context === undefined) {
        throw new Error('useDeal must be used within a DealProvider');
    }
    return context;
};
