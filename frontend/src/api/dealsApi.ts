import axios from 'axios';
import { Deal } from '../types';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const dealsApi = {
  fetchDeals: (): Promise<{ data: Deal[] }> => api.get('/deals'),
  createDeal: (deal: Partial<Deal>): Promise<{ data: Deal }> => api.post('/deals', deal),
  getDeal: (id: number): Promise<{ data: Deal }> => api.get(`/deals/${id}`),
  updateDeal: (id: number, deal: Partial<Deal>): Promise<{ data: Deal }> => api.put(`/deals/${id}`, deal),
  deleteDeal: (id: number): Promise<void> => api.delete(`/deals/${id}`),
};
