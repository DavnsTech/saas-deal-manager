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
  creationDate: string;
  expectedCloseDate: string;
  responsible: string;
  company: string;
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
  lastInteractionDate: string;
  internalComments: string;
  attachedDocuments: string[];
  followUpSchedule: string;
  leadScore: number;
  lifetimeValue: number;
  region: string;
}

export interface User {
  id: number;
  username: string;
  email: string;
}
