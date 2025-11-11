// Define common types used across the backend

export interface User {
  id: string;
  username: string;
  email: string;
  passwordHash: string; // Store hashed passwords
}

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

export interface AuthPayload {
  userId: string;
  username: string;
}

export interface DecodedToken {
  userId: string;
  username: string;
  exp: number;
  iat: number;
}
