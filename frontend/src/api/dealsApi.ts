import axios from 'axios';
import { Deal } from '../types'; // Assuming you have a Deal type defined in types/index.ts

const API_URL = 'http://localhost:5000/api/deals'; // Assuming your backend is running on port 5000

export const getDeals = async (): Promise<Deal[]> => {
  try {
    const response = await axios.get<Deal[]>(API_URL, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching deals:', error);
    throw error;
  }
};

export const getDealById = async (id: string): Promise<Deal> => {
  try {
    const response = await axios.get<Deal>(`${API_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching deal with id ${id}:`, error);
    throw error;
  }
};

export const createDeal = async (dealData: Omit<Deal, 'id'>): Promise<Deal> => {
  try {
    const response = await axios.post<Deal>(API_URL, dealData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error creating deal:', error);
    throw error;
  }
};

export const updateDeal = async (id: string, dealData: Partial<Deal>): Promise<Deal> => {
  try {
    const response = await axios.put<Deal>(`${API_URL}/${id}`, dealData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error updating deal with id ${id}:`, error);
    throw error;
  }
};

export const deleteDeal = async (id: string): Promise<void> => {
  try {
    await axios.delete(`${API_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  } catch (error) {
    console.error(`Error deleting deal with id ${id}:`, error);
    throw error;
  }
};
