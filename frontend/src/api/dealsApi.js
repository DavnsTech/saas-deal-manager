import axios from 'axios';

// Use environment variable for API URL, fallback to localhost
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api/deals';

// Helper to get authentication headers
const getAuthHeaders = () => ({
  Authorization: `Bearer ${localStorage.getItem('token')}`,
});

/**
 * Fetches all deals from the API.
 * @returns {Promise<Array>} A promise that resolves to an array of deal objects.
 * @throws {Error} If the API request fails.
 */
export const getDeals = async () => {
  try {
    const response = await axios.get(API_URL, { headers: getAuthHeaders() });
    return response.data;
  } catch (error) {
    console.error('Error fetching deals:', error);
    // Provide more specific error information if available
    const errorMessage = error.response?.data?.message || error.message || 'An unknown error occurred while fetching deals.';
    throw new Error(errorMessage);
  }
};

/**
 * Fetches a single deal by its ID.
 * @param {string} id - The ID of the deal to fetch.
 * @returns {Promise<Object>} A promise that resolves to the deal object.
 * @throws {Error} If the API request fails.
 */
export const getDealById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`, { headers: getAuthHeaders() });
    return response.data;
  } catch (error) {
    console.error(`Error fetching deal with id ${id}:`, error);
    const errorMessage = error.response?.data?.message || error.message || `An unknown error occurred while fetching deal ${id}.`;
    throw new Error(errorMessage);
  }
};

/**
 * Creates a new deal via the API.
 * @param {Object} dealData - The data for the new deal.
 * @returns {Promise<Object>} A promise that resolves to the created deal object.
 * @throws {Error} If the API request fails.
 */
export const createDeal = async (dealData) => {
  try {
    const response = await axios.post(API_URL, dealData, { headers: getAuthHeaders() });
    return response.data;
  } catch (error) {
    console.error('Error creating deal:', error);
    const errorMessage = error.response?.data?.message || error.message || 'An unknown error occurred while creating the deal.';
    throw new Error(errorMessage);
  }
};

/**
 * Updates an existing deal by its ID.
 * @param {string} id - The ID of the deal to update.
 * @param {Object} dealData - The updated data for the deal.
 * @returns {Promise<Object>} A promise that resolves to the updated deal object.
 * @throws {Error} If the API request fails.
 */
export const updateDeal = async (id, dealData) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, dealData, { headers: getAuthHeaders() });
    return response.data;
  } catch (error) {
    console.error(`Error updating deal with id ${id}:`, error);
    const errorMessage = error.response?.data?.message || error.message || `An unknown error occurred while updating deal ${id}.`;
    throw new Error(errorMessage);
  }
};

/**
 * Deletes a deal by its ID.
 * @param {string} id - The ID of the deal to delete.
 * @returns {Promise<Object>} A promise that resolves to the API response.
 * @throws {Error} If the API request fails.
 */
export const deleteDeal = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`, { headers: getAuthHeaders() });
    return response.data;
  } catch (error) {
    console.error(`Error deleting deal with id ${id}:`, error);
    const errorMessage = error.response?.data?.message || error.message || `An unknown error occurred while deleting deal ${id}.`;
    throw new Error(errorMessage);
  }
};
