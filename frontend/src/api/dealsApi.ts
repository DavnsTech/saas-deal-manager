import axios from 'axios';
import { Deal } from '../types'; // Assuming Deal type is defined in ../types

const API_URL = 'http://localhost:5000/api'; // Or your actual backend URL

export const getDeals = async (): Promise<Deal[]> => {
  try {
    const response = await axios.get(`${API_URL}/deals`);
    return response.data;
  } catch (error) {
    console.error('Error fetching deals:', error);
    throw error;
  }
};

export const getDealById = async (id: string): Promise<Deal> => {
  try {
    const response = await axios.get(`${API_URL}/deals/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching deal with id ${id}:`, error);
    throw error;
  }
};

export const createDeal = async (dealData: Omit<Deal, 'id'>): Promise<Deal> => {
  try {
    const response = await axios.post(`${API_URL}/deals`, dealData);
    return response.data;
  } catch (error) {
    console.error('Error creating deal:', error);
    throw error;
  }
};

export const updateDeal = async (id: string, dealData: Partial<Deal>): Promise<Deal> => {
  try {
    const response = await axios.put(`${API_URL}/deals/${id}`, dealData);
    return response.data;
  } catch (error) {
    console.error(`Error updating deal with id ${id}:`, error);
    throw error;
  }
};

export const deleteDeal = async (id: string): Promise<void> => {
  try {
    await axios.delete(`${API_URL}/deals/${id}`);
  } catch (error) {
    console.error(`Error deleting deal with id ${id}:`, error);
    throw error;
  }
};
