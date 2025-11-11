export interface Deal {
  _id: string;
  name: string;
  amount: number;
  currency: string;
  status: 'open' | 'won' | 'lost';
  stage: 
    | 'prospection' 
    | 'qualification' 
    | 'contact' 
    | 'discovery' 
    | 'proposal' 
    | 'negotiation' 
    | 'closing' 
    | 'delivery' 
    | 'upsell';
  leadSource: string;
  priority: 'low' | 'medium' | 'high';
  closingProbability: number;
  createdAt: Date;
  expectedCloseDate: Date;
  ownerId: string; // User ID
  contactId: string; // Contact ID
  companyId?: string; // Company ID (for B2B)
  dealType: 'B2B' | 'B2C';
  // B2B specific fields
  sector?: string;
  companySize?: string;
  contractType?: string;
  contractDuration?: number;
  decisionMakers?: Array<{
    id: string;
    role: string;
    influence: number;
  }>;
  // B2C specific fields
  lifetimeValue?: number;
  // Common fields
  acquisitionChannel: string;
  identifiedNeed: string;
  proposedSolution: string;
  paymentMethod: string;
  lastInteractionDate: Date;
  internalComments: string[];
  documents: Array<{ url: string; name: string; type: string }>;
  followUp: Array<{ date: Date; notes: string }>;
  leadScore: number;
  region: string;
  country: string;
}
