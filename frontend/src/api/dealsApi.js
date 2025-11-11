// This file would contain functions to interact with your backend API.
// For simplicity, we'll mock it here. In a real app, you'd use fetch or Axios.

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api'; // Example using env var

export const fetchDeals = async () => {
  // In a real application:
  // const response = await fetch(`${API_BASE_URL}/deals`);
  // if (!response.ok) {
  //   throw new Error(`HTTP error! status: ${response.status}`);
  // }
  // return await response.json();

  // Mock data for demonstration:
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 'd1', name: 'Acquisition for TechCorp', clientName: 'TechCorp', value: 150000, stage: 'Negotiation' },
        { id: 'd2', name: 'SaaS Subscription for BizSolutions', clientName: 'BizSolutions', value: 25000, stage: 'Discovery' },
        { id: 'd3', name: 'Consulting Services for Global Inc.', clientName: 'Global Inc.', value: 75000, stage: 'Closed Won' },
      ]);
    }, 1000); // Simulate network latency
  });
};

export const createDeal = async (dealData) => {
  // In a real application:
  // const response = await fetch(`${API_BASE_URL}/deals`, {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify(dealData),
  // });
  // if (!response.ok) {
  //   throw new Error(`HTTP error! status: ${response.status}`);
  // }
  // return await response.json();

  // Mock success
  console.log('Creating deal:', dealData);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ ...dealData, id: `new-${Date.now()}` });
    }, 500);
  });
};

// ... other API functions like getDealById, updateDeal, deleteDeal
