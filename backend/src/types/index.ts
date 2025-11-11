export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'sales' | 'manager';
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Deal {
  id: string;
  name: string;
  amount: number;
  currency: string;
  status: string;
  salesStage: string;
  sourceLead: string;
  priority: 'Low' | 'Medium' | 'High';
  probabilityClosing: number;
  createdDate: Date;
  expectedClosingDate?: Date;
  assignedUserId: string;
  company: string;
  contactPrincipal: string;
  email: string;
  phone?: string;
  activitySector?: string;
  companySize?: string;
  acquisitionChannel?: string;
  identifiedNeed?: string;
  proposedSolution?: string;
  contractType?: string;
  contractDuration?: string;
  paymentMode?: string;
  lastInteractionDate?: Date;
  internalComments?: string;
  attachedDocuments?: string;
  followupTracking?: string;
  leadScore?: number;
  estimatedLifetimeValue?: number;
  regionCountry?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
