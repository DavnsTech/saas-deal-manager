import axios from 'axios';

const API_URL = 'http://localhost:3000/api/deals'; // Assuming your backend is running on port 3000

export const getDeals = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(API_URL, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching deals:', error.response ? error.response.data : error.message);
    throw error;
  }
};

export const getDealById = async (id) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${API_URL}/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching deal with id ${id}:`, error.response ? error.response.data : error.message);
    throw error;
  }
};

export const createDeal = async (dealData) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.post(API_URL, dealData, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error creating deal:', error.response ? error.response.data : error.message);
    throw error;
  }
};

export const updateDeal = async (id, dealData) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.put(`${API_URL}/${id}`, dealData, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error(`Error updating deal with id ${id}:`, error.response ? error.response.data : error.message);
    throw error;
  }
};

export const deleteDeal = async (id) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.delete(`${API_URL}/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error(`Error deleting deal with id ${id}:`, error.response ? error.response.data : error.message);
    throw error;
  }
};
