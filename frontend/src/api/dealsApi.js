import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const fetchDeals = async () => {
  const response = await api.get('/deals');
  return response.data;
};

export const fetchDealById = async (id) => {
  const response = await api.get(`/deals/${id}`);
  return response.data;
};

export const createDeal = async (dealData) => {
  const response = await api.post('/deals', dealData);
  return response.data;
};

export const updateDeal = async (id, dealData) => {
  const response = await api.put(`/deals/${id}`, dealData);
  return response.data;
};

export const deleteDeal = async (id) => {
  await api.delete(`/deals/${id}`);
};
