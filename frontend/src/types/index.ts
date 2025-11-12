// Basic Deal type, expand as needed based on backend Deal model
export interface Deal {
  id: string;
  name: string;
  company: string;
  value: number;
  stage: string; // e.g., 'Prospecting', 'Negotiation', 'Closed Won', 'Closed Lost'
  createdAt?: Date;
  updatedAt?: Date;
  // Add custom fields here as your CRM evolves
  // Example: customField1?: string;
  // Example: customField2?: number;
}

// User type for authentication (if applicable)
export interface User {
  id: string;
  username: string;
  email: string;
  // Add other user properties as needed
}

// Define possible deal stages for consistency
export type DealStage =
  | 'Prospecting'
  | 'Qualification'
  | 'Proposal'
  | 'Negotiation'
  | 'Closed Won'
  | 'Closed Lost';

