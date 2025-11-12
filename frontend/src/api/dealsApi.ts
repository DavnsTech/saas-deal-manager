import axios from 'axios';

// Define an interface for the Deal object for better type safety
interface Deal {
  id?: number;
  name: string;
  description?: string;
  value: number;
  stage: string;
  createdAt?: string;
  updatedAt?: string;
}

const API_URL = 'http://localhost:3000/api/deals'; // Assuming your backend is running on port 3000

export const getDeals = async (): Promise<Deal[]> => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Authentication token not found.');
    }
    const response = await axios.get<Deal[]>(API_URL, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching deals:', error instanceof Error ? error.message : 'An unknown error occurred');
    throw error;
  }
};

export const getDealById = async (id: number): Promise<Deal> => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Authentication token not found.');
    }
    const response = await axios.get<Deal>(`${API_URL}/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching deal with id ${id}:`, error instanceof Error ? error.message : 'An unknown error occurred');
    throw error;
  }
};

export const createDeal = async (dealData: Omit<Deal, 'id' | 'createdAt' | 'updatedAt'>): Promise<Deal> => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Authentication token not found.');
    }
    const response = await axios.post<Deal>(API_URL, dealData, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error creating deal:', error instanceof Error ? error.message : 'An unknown error occurred');
    throw error;
  }
};

export const updateDeal = async (id: number, dealData: Partial<Deal>): Promise<Deal> => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Authentication token not found.');
    }
    const response = await axios.put<Deal>(`${API_URL}/${id}`, dealData, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error(`Error updating deal with id ${id}:`, error instanceof Error ? error.message : 'An unknown error occurred');
    throw error;
  }
};

export const deleteDeal = async (id: number): Promise<void> => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Authentication token not found.');
    }
    await axios.delete(`${API_URL}/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
  } catch (error) {
    console.error(`Error deleting deal with id ${id}:`, error instanceof Error ? error.message : 'An unknown error occurred');
    throw error;
  }
};
