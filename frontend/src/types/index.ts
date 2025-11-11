// Define the structure of a Deal object
export interface Deal {
  id: string;
  name: string;
  client: string;
  value: number;
  stage: string; // e.g., 'Prospecting', 'Qualification', 'Closed Won'
  createdAt?: Date; // Optional: for tracking creation time
  updatedAt?: Date; // Optional: for tracking last update time
  // Add any other custom fields relevant to your deals
  // customField1?: string;
  // customField2?: number;
}

// Define user types if user authentication and management are handled
export interface User {
  id: string;
  username: string;
  email: string;
  // ... other user properties
}

// Define types for API responses, e.g., pagination
export interface PaginatedResponse<T> {
  data: T[];
  totalItems: number;
  totalPages: number;
  currentPage: number;
}

// Define potential error structures from the API
export interface ApiError {
  message: string;
  statusCode?: number;
  details?: any; // More specific error details if available
}

// Add other types as needed for components, forms, etc.
