export interface Deal {
  id: number;
  name: string;
  amount: number;
  currency: string;
  status: string;
  stage: string;
  source: string;
  priority: string;
  probability: number;
  createdAt: string;
  expectedCloseDate: string;
  owner: string;
  company: string;
  contact: string;
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
  lastInteraction: string;
  internalComments: string;
  attachedDocuments: string[];
  followUp: string;
  leadScore: number;
  lifetimeValue: number;
  region: string;
}

export interface User {
  id: number;
  email: string;
  name: string;
}
