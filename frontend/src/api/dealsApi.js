import axios from 'axios';

// Mocking deals data for local development and testing
let mockDeals = JSON.parse(localStorage.getItem('mockDeals')) || [
    {
        id: 'deal-1',
        name: 'Project Alpha',
        amount: 150000,
        currency: 'USD',
        status: 'Open',
        stage: 'Qualification',
        source: 'Website Inquiry',
        priority: 'High',
        probability: 75,
        createdAt: '2023-10-26T10:00:00Z',
        closeDate: '2023-12-15T10:00:00Z',
        responsible: 'Alice Smith',
        client: 'Tech Solutions Inc.',
        contact: 'Bob Johnson',
        email: 'bob.johnson@techsolutions.com',
        phone: '123-456-7890',
        sector: 'Technology',
        companySize: '50-200',
        acquisitionChannel: 'Inbound Marketing',
        identifiedNeed: 'Scalable cloud infrastructure',
        proposedSolution: 'Custom cloud migration plan',
        contractType: 'Service Agreement',
        contractDuration: '12 months',
        paymentMode: 'Monthly Invoice',
        lastInteraction: '2023-10-25T14:30:00Z',
        internalComments: 'Client is very interested in our enterprise solutions.',
        attachedDocuments: 'proposal_alpha.pdf',
        followUpReminder: '2023-10-30T09:00:00Z',
        leadScore: 85,
        lifetimeValue: 300000,
        region: 'North America'
    },
    {
        id: 'deal-2',
        name: 'Service Expansion Beta',
        amount: 75000,
        currency: 'EUR',
        status: 'Open',
        stage: 'Prospection',
        source: 'Cold Call',
        priority: 'Medium',
        probability: 40,
        createdAt: '2023-10-20T11:00:00Z',
        closeDate: '2024-01-31T11:00:00Z',
        responsible: 'Charlie Brown',
        client: 'Global Enterprises Ltd.',
        contact: 'Diana Prince',
        email: 'diana.prince@globalenterprises.com',
        phone: '+44 20 1234 5678',
        sector: 'Manufacturing',
        companySize: '500+',
        acquisitionChannel: 'Direct Sales',
        identifiedNeed: 'Improve supply chain efficiency',
        proposedSolution: 'ERP module integration',
        contractType: 'Subscription',
        contractDuration: '24 months',
        paymentMode: 'Annual Prepayment',
        lastInteraction: '2023-10-23T10:15:00Z',
        internalComments: 'Needs a demo of the supply chain module.',
        attachedDocuments: 'brochure_beta.pdf',
        followUpReminder: '2023-11-05T11:00:00Z',
        leadScore: 60,
        lifetimeValue: 150000,
        region: 'Europe'
    }
];

// Simulate API delay
const simulateApiDelay = (data, delay = 500) => {
    return new Promise(resolve => setTimeout(() => resolve(data), delay));
};

// Mock authentication functions
const MOCK_TOKEN = 'mock-jwt-token-12345';
export const loginUser = async (credentials) => {
    console.log("Attempting login with:", credentials);
    // In a real app, you'd validate credentials against a backend
    if (credentials.email === 'test@example.com' && credentials.password === 'password') {
        localStorage.setItem('token', MOCK_TOKEN);
        // Store mock user data if needed for frontend display
        localStorage.setItem('currentUser', JSON.stringify({ id: 'user-1', name: 'Test User', email: 'test@example.com' }));
        return simulateApiDelay({ token: MOCK_TOKEN, user: { id: 'user-1', name: 'Test User', email: 'test@example.com' } });
    } else {
        return simulateApiDelay({ error: 'Invalid credentials' }, 300);
    }
};

export const registerUser = async (userData) => {
    console.log("Attempting registration with:", userData);
    // In a real app, you'd send this to a backend for registration
    // For mock, we'll just simulate success and potentially log the user in
    await simulateApiDelay({}, 500); // Simulate registration time
    // Optionally, log the user in immediately
    localStorage.setItem('token', MOCK_TOKEN);
    localStorage.setItem('currentUser', JSON.stringify({ id: 'user-generated-' + Date.now(), name: userData.name, email: userData.email }));
    return simulateApiDelay({ message: 'User registered successfully', user: { id: 'user-generated-' + Date.now(), name: userData.name, email: userData.email } });
};

export const logoutUser = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
    // In a real app, you might also call a backend logout endpoint
    return Promise.resolve();
};

// Axios interceptor for attaching token
axios.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Base URL for your API. Consider moving this to an environment variable.
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

/**
 * Fetches all deals from the API.
 * @returns {Promise<Array<Deal>>} A promise that resolves with an array of deals.
 * @throws {Error} If the API request fails.
 */
export const fetchDeals = async () => {
    try {
        // Simulate fetching from mock data if no real API is available
        if (API_BASE_URL === 'http://localhost:5000/api') {
            await simulateApiDelay(); // Simulate network latency
            const deals = JSON.parse(localStorage.getItem('mockDeals')) || mockDeals;
            // Basic validation: ensure response.data is an array
            if (!Array.isArray(deals)) {
                throw new Error('Mock API did not return an array of deals.');
            }
            return deals;
        } else {
            const response = await axios.get(`${API_BASE_URL}/deals`);
            if (!Array.isArray(response.data)) {
                throw new Error('API did not return an array of deals.');
            }
            return response.data;
        }
    } catch (error) {
        console.error("Error fetching deals:", error);
        throw new Error(error.response?.data?.message || error.message || 'Failed to fetch deals. Please try again later.');
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
        // Simulate fetching from mock data
        if (API_BASE_URL === 'http://localhost:5000/api') {
            await simulateApiDelay(); // Simulate network latency
            const deals = JSON.parse(localStorage.getItem('mockDeals')) || mockDeals;
            const deal = deals.find(d => d.id === id);
            if (!deal) {
                throw new Error(`Deal with ID ${id} not found.`);
            }
            return deal;
        } else {
            const response = await axios.get(`${API_BASE_URL}/deals/${id}`);
            return response.data;
        }
    } catch (error) {
        console.error(`Error fetching deal with ID ${id}:`, error);
        throw new Error(error.response?.data?.message || error.message || `Failed to fetch deal ${id}.`);
    }
};

/**
 * Creates a new deal.
 * @param {object} dealData - The data for the new deal.
 * @returns {Promise<Deal>} A promise that resolves with the created deal object.
 * @throws {Error} If the API request fails.
 */
export const createDeal = async (dealData) => {
    try {
        // Simulate creating a new deal in mock data
        if (API_BASE_URL === 'http://localhost:5000/api') {
            await simulateApiDelay(); // Simulate network latency
            const deals = JSON.parse(localStorage.getItem('mockDeals')) || mockDeals;
            const newDeal = {
                id: `deal-${Date.now()}`, // Generate a unique ID
                ...dealData,
                createdAt: new Date().toISOString(),
                // Ensure required fields are present, e.g., status
                status: dealData.status || 'Open',
                stage: dealData.stage || 'Prospection',
                probability: dealData.probability || 0,
                leadScore: dealData.leadScore || 0,
                lifetimeValue: dealData.lifetimeValue || 0,
            };
            deals.push(newDeal);
            localStorage.setItem('mockDeals', JSON.stringify(deals));
            return newDeal;
        } else {
            const response = await axios.post(`${API_BASE_URL}/deals`, dealData);
            return response.data;
        }
    } catch (error) {
        console.error("Error creating deal:", error);
        throw new Error(error.response?.data?.message || error.message || 'Failed to create deal. Please check the details and try again.');
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
    try {
        // Simulate updating a deal in mock data
        if (API_BASE_URL === 'http://localhost:5000/api') {
            await simulateApiDelay(); // Simulate network latency
            const deals = JSON.parse(localStorage.getItem('mockDeals')) || mockDeals;
            const dealIndex = deals.findIndex(d => d.id === id);
            if (dealIndex === -1) {
                throw new Error(`Deal with ID ${id} not found.`);
            }
            const updatedDeal = { ...deals[dealIndex], ...dealData, id: id }; // Ensure ID is preserved
            deals[dealIndex] = updatedDeal;
            localStorage.setItem('mockDeals', JSON.stringify(deals));
            return updatedDeal;
        } else {
            const response = await axios.put(`${API_BASE_URL}/deals/${id}`, dealData);
            return response.data;
        }
    } catch (error) {
        console.error(`Error updating deal with ID ${id}:`, error);
        throw new Error(error.response?.data?.message || error.message || `Failed to update deal ${id}.`);
    }
};

/**
 * Deletes a deal.
 * @param {string} id - The ID of the deal to delete.
 * @returns {Promise<void>} A promise that resolves when the deal is deleted.
 * @throws {Error} If the API request fails.
 */
export const deleteDeal = async (id) => {
    if (!id) {
        throw new Error("Deal ID is required to delete a deal.");
    }
    try {
        // Simulate deleting a deal from mock data
        if (API_BASE_URL === 'http://localhost:5000/api') {
            await simulateApiDelay(); // Simulate network latency
            const deals = JSON.parse(localStorage.getItem('mockDeals')) || mockDeals;
            const initialLength = deals.length;
            const updatedDeals = deals.filter(d => d.id !== id);
            if (updatedDeals.length === initialLength) {
                throw new Error(`Deal with ID ${id} not found.`);
            }
            localStorage.setItem('mockDeals', JSON.stringify(updatedDeals));
            return; // Successful deletion returns nothing
        } else {
            await axios.delete(`${API_BASE_URL}/deals/${id}`);
            return;
        }
    } catch (error) {
        console.error(`Error deleting deal with ID ${id}:`, error);
        throw new Error(error.response?.data?.message || error.message || `Failed to delete deal ${id}.`);
    }
};
