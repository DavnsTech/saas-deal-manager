import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api/deals'; // Use environment variable or default

const getAuthHeaders = () => ({
  Authorization: `Bearer ${localStorage.getItem('token')}`,
});

export const getDeals = async () => {
  try {
    const response = await axios.get(API_URL, { headers: getAuthHeaders() });
    return response.data;
  } catch (error) {
    console.error('Error fetching deals:', error);
    throw error; // Re-throw to be caught by context/component
  }
};

export const getDealById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`, { headers: getAuthHeaders() });
    return response.data;
  } catch (error) {
    console.error(`Error fetching deal with id ${id}:`, error);
    throw error;
  }
};

export const createDeal = async (dealData) => {
  try {
    const response = await axios.post(API_URL, dealData, { headers: getAuthHeaders() });
    return response.data;
  } catch (error) {
    console.error('Error creating deal:', error);
    throw error;
  }
};

export const updateDeal = async (id, dealData) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, dealData, { headers: getAuthHeaders() });
    return response.data;
  } catch (error) {
    console.error(`Error updating deal with id ${id}:`, error);
    throw error;
  }
};

export const deleteDeal = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`, { headers: getAuthHeaders() });
    return response.data;
  } catch (error) {
    console.error(`Error deleting deal with id ${id}:`, error);
    throw error;
  }
};
