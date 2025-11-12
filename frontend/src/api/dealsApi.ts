// This is the TypeScript version of the deals API client.
// It's generally preferred to use TypeScript for consistency and type safety.

import axios from 'axios';

const API_URL = 'http://localhost:5000/api/deals'; // Adjust if your backend is on a different port or domain

interface Deal {
  id: number;
  name: string;
  stage: string;
  company?: string;
  contactPerson?: string;
  value?: number;
  expectedCloseDate?: string; // Date stored as string from API
  createdAt: string;
  updatedAt: string;
}

interface CreateDealData {
  name: string;
  stage: string;
  company?: string;
  contactPerson?: string;
  value?: number;
  expectedCloseDate?: string; // Accepts string for date input
}

interface UpdateDealData {
  name?: string;
  stage?: string;
  company?: string;
  contactPerson?: string;
  value?: number;
  expectedCloseDate?: string;
}

const getAuthToken = (): string | null => localStorage.getItem('token');

export const fetchDeals = async (): Promise<Deal[]> => {
  const token = getAuthToken();
  if (!token) throw new Error('Authentication token not found');

  try {
    const response = await axios.get<Deal[]>(API_URL, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error: any) {
    console.error('Error fetching deals:', error);
    throw error.response?.data || error.message || 'Failed to fetch deals';
  }
};

export const createDeal = async (dealData: CreateDealData): Promise<Deal> => {
  const token = getAuthToken();
  if (!token) throw new Error('Authentication token not found');

  try {
    const response = await axios.post<Deal>(API_URL, dealData, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error: any) {
    console.error('Error creating deal:', error);
    throw error.response?.data || error.message || 'Failed to create deal';
  }
};

export const getDealById = async (id: number): Promise<Deal> => {
  const token = getAuthToken();
  if (!token) throw new Error('Authentication token not found');

  try {
    const response = await axios.get<Deal>(`${API_URL}/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error: any) {
    console.error(`Error fetching deal with id ${id}:`, error);
    throw error.response?.data || error.message || `Failed to fetch deal ${id}`;
  }
};

export const updateDeal = async (id: number, dealData: UpdateDealData): Promise<Deal> => {
  const token = getAuthToken();
  if (!token) throw new Error('Authentication token not found');

  try {
    const response = await axios.put<Deal>(`${API_URL}/${id}`, dealData, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error: any) {
    console.error(`Error updating deal with id ${id}:`, error);
    throw error.response?.data || error.message || `Failed to update deal ${id}`;
  }
};

export const deleteDeal = async (id: number): Promise<any> => { // Response type can be more specific if backend returns a structure
  const token = getAuthToken();
  if (!token) throw new Error('Authentication token not found');

  try {
    const response = await axios.delete<any>(`${API_URL}/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error: any) {
    console.error(`Error deleting deal with id ${id}:`, error);
    throw error.response?.data || error.message || `Failed to delete deal ${id}`;
  }
};
