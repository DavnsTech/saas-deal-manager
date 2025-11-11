import axios from 'axios';

// Assume API_BASE_URL is defined elsewhere, e.g., in a .env file
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api'; // Example

// Create an Axios instance with base URL and interceptors
const api = axios.create({
    baseURL: API_BASE_URL,
});

// Add a request interceptor to include the auth token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('jwtToken'); // Or get from AuthContext
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        // Do something with request error
        return Promise.reject(error);
    }
);

// Add a response interceptor for global error handling (e.g., redirect to login on 401)
api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response && error.response.status === 401) {
            // Redirect to login page or dispatch logout action
            console.error("Unauthorized access. Redirecting to login...");
            // Example: window.location.href = '/login';
            // Or dispatch(logout()) if using Redux/Context
        }
        return Promise.reject(error);
    }
);

export const fetchDeals = async () => {
    try {
        const response = await api.get('/deals');
        return response.data;
    } catch (error) {
        console.error('Error fetching deals:', error.response?.data || error.message);
        throw error; // Re-throw to be caught by component/context
    }
};

export const fetchDealById = async (id) => {
    try {
        const response = await api.get(`/deals/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching deal with ID ${id}:`, error.response?.data || error.message);
        throw error;
    }
};

export const createDeal = async (dealData) => {
    try {
        const response = await api.post('/deals', dealData);
        return response.data;
    } catch (error) {
        console.error('Error creating deal:', error.response?.data || error.message);
        throw error;
    }
};

export const updateDeal = async (id, dealData) => {
    try {
        const response = await api.put(`/deals/${id}`, dealData);
        return response.data;
    } catch (error) {
        console.error(`Error updating deal with ID ${id}:`, error.response?.data || error.message);
        throw error;
    }
};

export const deleteDeal = async (id) => {
    try {
        const response = await api.delete(`/deals/${id}`);
        return response.data; // Typically empty for 204, but backend might return a message
    } catch (error) {
        console.error(`Error deleting deal with ID ${id}:`, error.response?.data || error.message);
        throw error;
    }
};
