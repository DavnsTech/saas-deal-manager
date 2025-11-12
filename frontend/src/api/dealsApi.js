// This file is a placeholder, you might want to convert it to TS or use a more robust API client.
// For now, it's kept as JS for simplicity if it was part of the original structure.
// If you are migrating to TS, this should be dealsApi.ts

import axios from 'axios';

const API_URL = 'http://localhost:5000/api/deals'; // Adjust if your backend is on a different port or domain

const getAuthToken = () => localStorage.getItem('token');

export const fetchDeals = async () => {
  try {
    const token = getAuthToken();
    const response = await axios.get(API_URL, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching deals:', error);
    throw error; // Re-throw to be handled by the caller
  }
};

export const createDeal = async (dealData) => {
  try {
    const token = getAuthToken();
    const response = await axios.post(API_URL, dealData, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error creating deal:', error);
    throw error;
  }
};

export const getDealById = async (id) => {
  try {
    const token = getAuthToken();
    const response = await axios.get(`${API_URL}/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching deal with id ${id}:`, error);
    throw error;
  }
};

export const updateDeal = async (id, dealData) => {
  try {
    const token = getAuthToken();
    const response = await axios.put(`${API_URL}/${id}`, dealData, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error(`Error updating deal with id ${id}:`, error);
    throw error;
  }
};

export const deleteDeal = async (id) => {
  try {
    const token = getAuthToken();
    const response = await axios.delete(`${API_URL}/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data; // Typically returns a success message or status
  } catch (error) {
    console.error(`Error deleting deal with id ${id}:`, error);
    throw error;
  }
};
