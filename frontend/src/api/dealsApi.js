import axios from 'axios';

// Base URL for your API. Consider moving this to an environment variable.
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api'; // Example

/**
 * Fetches all deals from the API.
 * @returns {Promise<Array<Deal>>} A promise that resolves with an array of deals.
 * @throws {Error} If the API request fails.
 */
export const fetchDeals = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/deals`);
    // Basic validation: ensure response.data is an array
    if (!Array.isArray(response.data)) {
      throw new Error('API did not return an array of deals.');
    }
    return response.data;
  } catch (error) {
    console.error("Error fetching deals:", error);
    // Re-throw a more specific error or handle as needed
    throw new Error(error.response?.data?.message || 'Failed to fetch deals. Please try again later.');
  }
};

/**
 * Fetches a single deal by its ID.
 * @param {string} id - The ID of the deal to fetch.
 * @returns {Promise<Deal>} A promise that resolves with the deal object.
 * @throws {Error} If the API request fails.
 */
export const fetchDealById = async (id) => {
  if (!id) {
    throw new Error("Deal ID is required to fetch a deal.");
  }
  try {
    const response = await axios.get(`${API_BASE_URL}/deals/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching deal with ID ${id}:`, error);
    throw new Error(error.response?.data?.message || `Failed to fetch deal ${id}.`);
  }
};

/**
 * Creates a new deal.
 * @param {object} dealData - The data for the new deal.
 * @returns {Promise<Deal>} A promise that resolves with the created deal object.
 * @throws {Error} If the API request fails.
 */
export const createDeal = async (dealData) => {
  if (!dealData) {
    throw new Error("Deal data is required to create a deal.");
  }
  try {
    const response = await axios.post(`${API_BASE_URL}/deals`, dealData);
    return response.data;
  } catch (error) {
    console.error("Error creating deal:", error);
    throw new Error(error.response?.data?.message || 'Failed to create deal.');
  }
};

/**
 * Updates an existing deal.
 * @param {string} id - The ID of the deal to update.
 * @param {object} dealData - The updated data for the deal.
 * @returns {Promise<Deal>} A promise that resolves with the updated deal object.
 * @throws {Error} If the API request fails.
 */
export const updateDeal = async (id, dealData) => {
  if (!id) {
    throw new Error("Deal ID is required to update a deal.");
  }
  if (!dealData) {
    throw new Error("Deal data is required to update a deal.");
  }
  try {
    const response = await axios.put(`${API_BASE_URL}/deals/${id}`, dealData);
    return response.data;
  } catch (error) {
    console.error(`Error updating deal with ID ${id}:`, error);
    throw new Error(error.response?.data?.message || `Failed to update deal ${id}.`);
  }
};

/**
 * Deletes a deal by its ID.
 * @param {string} id - The ID of the deal to delete.
 * @returns {Promise<void>} A promise that resolves when the deal is deleted.
 * @throws {Error} If the API request fails.
 */
export const deleteDeal = async (id) => {
  if (!id) {
    throw new Error("Deal ID is required to delete a deal.");
  }
  try {
    await axios.delete(`${API_BASE_URL}/deals/${id}`);
  } catch (error) {
    console.error(`Error deleting deal with ID ${id}:`, error);
    throw new Error(error.response?.data?.message || `Failed to delete deal ${id}.`);
  }
};

// Note: You would typically have authentication tokens managed here as well,
// perhaps using interceptors in axios to add them to every request.
