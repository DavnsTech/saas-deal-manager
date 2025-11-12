import axios from 'axios';
import { Deal } from '../types';

const API_URL = 'http://localhost:5000/api/deals';

const getAuthToken = (): string | null => localStorage.getItem('token');

export const fetchDeals = async (): Promise<Deal[]> => {
  const token = getAuthToken();
  const response = await axios.get(API_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const createDeal = async (dealData: Partial<Deal>): Promise<Deal> => {
  const token = getAuthToken();
  const response = await axios.post(API_URL, dealData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const getDealById = async (id: number): Promise<Deal> => {
  const token = getAuthToken();
  const response = await axios.get(`${API_URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const updateDeal = async (id: number, dealData: Partial<Deal>): Promise<Deal> => {
  const token = getAuthToken();
  const response = await axios.put(`${API_URL}/${id}`, dealData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const deleteDeal = async (id: number): Promise<void> => {
  const token = getAuthToken();
  await axios.delete(`${API_URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
