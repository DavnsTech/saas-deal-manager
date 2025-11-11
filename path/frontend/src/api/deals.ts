import api from './api';

export interface Deal {
  id: string;
  name: string;
  amount: number;
  currency: string;
  stage: string;
  // ... other fields
}

export const fetchDeals = async (filters?: {
  stage?: string;
  type?: 'B2B' | 'B2C';
  search?: string;
}) => {
  const params = new URLSearchParams();
  
  if (filters?.stage) params.append('stage', filters.stage);
  if (filters?.type) params.append('type', filters.type);
  if (filters?.search) params.append('search', filters.search);
  
  const response = await api.get<Deal[]>('/deals', { params });
  return response.data;
};

export const createDeal = async (dealData: Partial<Deal>) => {
  const response = await api.post<Deal>('/deals', dealData);
  return response.data;
};

// Other API methods...
