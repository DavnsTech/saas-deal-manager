// User roles
export type UserRole = 'admin' | 'sales' | 'manager';

// Deal interface
export interface IDeal {
  id: string;
  name: string;
  amount: number;
  currency: string;
  status: string;
  stage: string;
  source: string;
  priority: string;
  closingProbability: number;
  createdAt: Date;
  expectedCloseDate: Date;
  salesRep: string;
  company: string;
  primaryContact: string;
  email: string;
  phone: string;
  industry: string;
  companySize: string;
  acquisitionChannel: string;
  identifiedNeed: string;
  proposedSolution: string;
  contractType: string;
  contractDuration: string;
  paymentMethod: string;
  lastInteractionDate: Date;
  internalNotes: string;
  followUpReminder: Date;
  leadScore: number;
  estimatedLifetimeValue: number;
  region: string;
  attachments: string[];
  createdBy: string;
  updatedBy: string;
  createdAt: Date;
  updatedAt: Date;
}

// Authentication interfaces
export interface IAuthRequest extends Request {
  user?: {
    id: string;
    email: string;
    role: UserRole;
  };
}

export interface IRegisterRequest {
  email: string;
  password: string;
  name: string;
  role?: UserRole;
}

export interface ILoginRequest {
  email: string;
  password: string;
}
