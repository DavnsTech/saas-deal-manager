import { Request } from 'express';

export interface UserPayload {
  userId: string;
  email: string;
  role: 'admin' | 'user'; // Example roles
}

export interface AuthRequest extends Request {
  user?: UserPayload;
}

export interface Deal {
  _id?: string;
  name: string;
  description?: string;
  value: number;
  currency: string;
  stage: string; // e.g., 'Prospecting', 'Negotiation', 'Closed Won', 'Closed Lost'
  customerId: string; // Assuming a customer ID for now, could be a separate model
  assignedUserId: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Customer {
  _id?: string;
  name: string;
  contactPerson?: string;
  email: string;
  phone?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
