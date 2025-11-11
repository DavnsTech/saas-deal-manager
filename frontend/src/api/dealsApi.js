// Mock API for demonstration. In a real app, this would use fetch or axios.
// Assumes a running backend at http://localhost:5000/api

const API_BASE_URL = 'http://localhost:5000/api'; // Replace with your actual API base URL

const getAuthToken = () => localStorage.getItem('authToken');

const request = async (url, options = {}) => {
  const token = getAuthToken();
  const headers = {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` }),
    ...options.headers,
  };

  try {
    const response = await fetch(`${API_BASE_URL}${url}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: 'An unknown error occurred' }));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API Request Error:', error);
    throw error; // Re-throw to be handled by the caller
  }
};

export const dealsApi = {
  getAllDeals: () => request('/deals'),
  getDealById: (id) => request(`/deals/${id}`),
  createDeal: (dealData) => request('/deals', { method: 'POST', body: JSON.stringify(dealData) }),
  updateDeal: (id, updateData) => request(`/deals/${id}`, { method: 'PATCH', body: JSON.stringify(updateData) }),
  deleteDeal: (id) => request(`/deals/${id}`, { method: 'DELETE' }),

  // Placeholder for auth API calls, assuming similar structure
  login: (credentials) => request('/auth/login', { method: 'POST', body: JSON.stringify(credentials) }),
  register: (userData) => request('/auth/register', { method: 'POST', body: JSON.stringify(userData) }),
  getCurrentUser: () => request('/users/me'),
};
