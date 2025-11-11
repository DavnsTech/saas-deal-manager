// Define common types used across the frontend

export interface Deal {
  id: string;
  name: string;
  description?: string;
  stage: string; // e.g., 'Prospecting', 'Negotiation', 'Closed Won', 'Closed Lost'
  value: number;
  createdAt: Date;
  updatedAt: Date;
  ownerId: string; // Foreign key to User
}

export interface User {
  userId: string;
  username: string;
  // Add other user properties as needed
}

export interface AuthState {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
}

// Type for API responses
export interface ApiResponse<T> {
  data?: T;
  message?: string;
  error?: string;
}
