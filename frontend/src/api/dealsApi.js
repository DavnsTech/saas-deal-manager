import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api'; // Use environment variable

const getAuthToken = () => localStorage.getItem('token');

const dealsApi = axios.create({
  baseURL: `${API_URL}/deals`,
});

// Add a request interceptor to include the token
dealsApi.interceptors.request.use(
  (config) => {
    const token = getAuthToken();
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const fetchDeals = async () => {
  try {
    const response = await dealsApi.get('/');
    return response.data;
  } catch (error) {
    console.error('Error fetching deals:', error);
    throw error; // Re-throw to be handled by the component
  }
};

export const fetchDealById = async (id) => {
  try {
    const response = await dealsApi.get(`/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching deal with ID ${id}:`, error);
    throw error;
  }
};

export const createDeal = async (dealData) => {
  try {
    const response = await dealsApi.post('/', dealData);
    return response.data;
  } catch (error) {
    console.error('Error creating deal:', error);
    throw error;
  }
};

export const updateDeal = async (id, dealData) => {
  try {
    const response = await dealsApi.put(`/${id}`, dealData);
    return response.data;
  } catch (error) {
    console.error(`Error updating deal with ID ${id}:`, error);
    throw error;
  }
};

export const deleteDeal = async (id) => {
  try {
    const response = await dealsApi.delete(`/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting deal with ID ${id}:`, error);
    throw error;
  }
};
