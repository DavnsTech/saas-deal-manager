export interface Deal {
  id: string;
  name: string;
  amount: number;
  currency: string;
  status: string;
  stage: string;
  source: string;
  priority: string;
  probability: number;
  createdAt: string;
  closeDate: string;
  responsible: string;
  client: string;
  contact: string;
  email: string;
  phone: string;
  sector: string;
  companySize: string;
  acquisitionChannel: string;
  identifiedNeed: string;
  proposedSolution: string;
  contractType: string;
  contractDuration: string;
  paymentMode: string;
  lastInteraction: string;
  internalComments: string;
  attachedDocuments: string;
  followUpReminder: string;
  leadScore: number;
  lifetimeValue: number;
  region: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}
