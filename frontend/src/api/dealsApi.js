const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api'; // Use environment variable

const getAuthToken = () => {
    // Assume token is stored in localStorage
    return localStorage.getItem('token');
};

const handleResponse = async (response) => {
    if (!response.ok) {
        const errorData = await response.json();
        // Throw an error that can be caught by the caller
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }
    return response.json();
};

export const fetchDeals = async () => {
    const token = getAuthToken();
    try {
        const response = await fetch(`${API_BASE_URL}/deals`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
        return await handleResponse(response);
    } catch (error) {
        console.error('Error fetching deals:', error);
        throw error; // Re-throw to be handled by the component
    }
};

export const createDeal = async (dealData) => {
    const token = getAuthToken();
    try {
        const response = await fetch(`${API_BASE_URL}/deals`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dealData),
        });
        return await handleResponse(response);
    } catch (error) {
        console.error('Error creating deal:', error);
        throw error;
    }
};

export const getDealById = async (dealId) => {
    const token = getAuthToken();
    try {
        const response = await fetch(`${API_BASE_URL}/deals/${dealId}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
        return await handleResponse(response);
    } catch (error) {
        console.error(`Error fetching deal ${dealId}:`, error);
        throw error;
    }
};

export const updateDeal = async (dealId, dealData) => {
    const token = getAuthToken();
    try {
        const response = await fetch(`${API_BASE_URL}/deals/${dealId}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dealData),
        });
        return await handleResponse(response);
    } catch (error) {
        console.error(`Error updating deal ${dealId}:`, error);
        throw error;
    }
};

export const deleteDeal = async (dealId) => {
    const token = getAuthToken();
    try {
        const response = await fetch(`${API_BASE_URL}/deals/${dealId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
        return await handleResponse(response); // Will return empty JSON on success or throw error
    } catch (error) {
        console.error(`Error deleting deal ${dealId}:`, error);
        throw error;
    }
};

// Example for authentication API calls
export const loginUser = async (credentials) => {
    try {
        const response = await fetch(`${API_BASE_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials),
        });
        const data = await handleResponse(response);
        if (data.token) {
            localStorage.setItem('token', data.token);
            // Store user info if needed
            localStorage.setItem('user', JSON.stringify(data.user));
        }
        return data;
    } catch (error) {
        console.error('Login API error:', error);
        throw error;
    }
};

export const registerUser = async (userData) => {
    try {
        const response = await fetch(`${API_BASE_URL}/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData),
        });
        const data = await handleResponse(response);
        if (data.token) {
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
        }
        return data;
    } catch (error) {
        console.error('Registration API error:', error);
        throw error;
    }
};

export const logoutUser = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    // Optionally, notify backend if using token revocation
};

export const getCurrentUser = () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
};
