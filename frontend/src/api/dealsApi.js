const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api'; // Use env variable

const getToken = () => {
    // Retrieve token from localStorage or wherever it's stored
    return localStorage.getItem('jwtToken');
};

const makeRequest = async (url, options = {}) => {
    const token = getToken();
    const headers = {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` }), // Add token if exists
        ...options.headers,
    };

    const response = await fetch(`${API_BASE_URL}${url}`, {
        ...options,
        headers,
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'An unknown error occurred' }));
        const error = new Error(errorData.message || `HTTP error! status: ${response.status}`);
        error.status = response.status;
        error.data = errorData;
        throw error;
    }

    return response.json();
};

export const dealsApi = {
    getAllDeals: async () => {
        return makeRequest('/deals');
    },

    getDealById: async (id) => {
        if (!id) throw new Error('Deal ID is required');
        return makeRequest(`/deals/${id}`);
    },

    createDeal: async (dealData) => {
        if (!dealData) throw new Error('Deal data is required');
        return makeRequest('/deals', {
            method: 'POST',
            body: JSON.stringify(dealData),
        });
    },

    updateDeal: async (id, dealData) => {
        if (!id) throw new Error('Deal ID is required');
        if (!dealData) throw new Error('Deal data is required');
        return makeRequest(`/deals/${id}`, {
            method: 'PUT',
            body: JSON.stringify(dealData),
        });
    },

    deleteDeal: async (id) => {
        if (!id) throw new Error('Deal ID is required');
        return makeRequest(`/deals/${id}`, {
            method: 'DELETE',
        });
    },
};
