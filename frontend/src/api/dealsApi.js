import axios from 'axios';

const API_URL = 'http://localhost:5000/api/deals'; // Assuming your backend is running on port 5000

export const getDeals = async () => {
  try {
    const response = await axios.get(API_URL, {
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

export const getDealById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`, {
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

export const createDeal = async (dealData) => {
  try {
    const response = await axios.post(API_URL, dealData, {
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

export const updateDeal = async (id, dealData) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, dealData, {
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

export const deleteDeal = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error deleting deal with id ${id}:`, error);
    throw error;
  }
};
