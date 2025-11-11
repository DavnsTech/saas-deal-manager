import { Deal, CreateDealPayload } from '../types';

const API_BASE_URL = '/api'; // Assuming your backend API is served at /api

// --- Helper for API requests ---
async function request<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, options);

  if (!response.ok) {
    let errorMessage = `HTTP error! status: ${response.status}`;
    try {
      const errorData = await response.json();
      errorMessage = errorData.message || errorMessage;
    } catch (e) {
      // Ignore if response body is not JSON or empty
    }
    throw new Error(errorMessage);
  }

  // Handle potential empty responses for certain operations (e.g., DELETE)
  if (response.status === 204) {
    return {} as T; // Return an empty object or appropriate type for 204
  }

  return await response.json() as T;
}

// --- Deal API Functions ---

export const fetchDeals = async (): Promise<Deal[]> => {
  return request<Deal[]>('/deals');
};

export const getDealById = async (id: string): Promise<Deal> => {
  if (!id) {
    throw new Error("Deal ID is required.");
  }
  return request<Deal>(`/deals/${id}`);
};

export const createDeal = async (dealData: CreateDealPayload): Promise<Deal> => {
  if (!dealData.name || !dealData.stage) {
    throw new Error("Deal name and stage are required.");
  }
  return request<Deal>('/deals', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(dealData),
  });
};

export const updateDeal = async (id: string, dealData: Partial<Deal>): Promise<Deal> => {
  if (!id) {
    throw new Error("Deal ID is required for update.");
  }
  return request<Deal>(`/deals/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(dealData),
  });
};

export const deleteDeal = async (id: string): Promise<void> => {
  if (!id) {
    throw new Error("Deal ID is required for deletion.");
  }
  await request<void>(`/deals/${id}`, {
    method: 'DELETE',
  });
};

// Add other API functions as needed (e.g., for users, authentication)
