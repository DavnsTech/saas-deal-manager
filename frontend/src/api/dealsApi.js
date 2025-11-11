import axios from 'axios';

// Use environment variables for API base URL
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api';

// Create an Axios instance for the API
const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add a response interceptor to handle global errors
api.interceptors.response.use(
    (response) => response,
    (error) => {
        // Handle common errors like network issues, authentication, etc.
        let message = 'An unexpected error occurred.';
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            message = error.response.data?.message || `Error ${error.response.status}: ${error.response.statusText}`;
        } else if (error.request) {
            // The request was made but no response was received
            message = 'No response from server. Please check your connection.';
        } else {
            // Something happened in setting up the request that triggered an Error
            message = error.message;
        }
        console.error('API Error:', message);
        // Optionally, you could dispatch a global error event or show a toast notification
        return Promise.reject(new Error(message));
    }
);

export const fetchDeals = (AbortControllerSignal) => {
    console.log('Fetching deals from API...');
    return api.get('/deals', { signal: AbortControllerSignal });
};

export const fetchDealById = (id, AbortControllerSignal) => {
    console.log(`Fetching deal ${id} from API...`);
    return api.get(`/deals/${id}`, { signal: AbortControllerSignal });
};

export const createDeal = (dealData) => {
    console.log('Creating deal via API:', dealData);
    return api.post('/deals', dealData);
};

export const updateDeal = (id, dealData) => {
    console.log(`Updating deal ${id} via API:`, dealData);
    return api.put(`/deals/${id}`, dealData);
};

export const deleteDeal = (id) => {
    console.log(`Deleting deal ${id} via API...`);
    return api.delete(`/deals/${id}`);
};

// You might also want to export the axios instance itself for more complex scenarios
export { api };
