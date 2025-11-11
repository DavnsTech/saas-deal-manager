import mongoose, { Schema, Document } from 'mongoose';

export interface IDeal extends Document {
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

const DealSchema: Schema = new Schema({
  name: { type: String, required: true },
  amount: { type: Number, required: true },
  currency: { type: String, required: true },
  status: { 
    type: String, 
    enum: ['open', 'won', 'lost'], 
    default: 'open' 
  },
  stage: { 
    type: String, 
    enum: [
      'prospection', 
      'qualification', 
      'contact', 
      'discovery', 
      'proposal', 
      'negotiation', 
      'closing', 
      'delivery', 
      'upsell'
    ],
    required: true 
  },
  leadSource: { type: String, required: true },
  priority: { 
    type: String, 
    enum: ['low', 'medium', 'high'], 
    default: 'medium' 
  },
  closingProbability: { type: Number, min: 0, max: 100 },
  createdAt: { type: Date, default: Date.now },
  expectedCloseDate: { type: Date },
  ownerId: { type: String, required: true },
  contactId: { type: String, required: true },
  companyId: { type: String },
  dealType: { 
    type: String, 
    enum: ['B2B', 'B2C'], 
    required: true 
  },
  sector: { type: String },
  companySize: { type: String },
  contractType: { type: String },
  contractDuration: { type: Number },
  decisionMakers: [{
    id: { type: String },
    role: { type: String },
    influence: { type: Number }
  }],
  lifetimeValue: { type: Number },
  acquisitionChannel: { type: String },
  identifiedNeed: { type: String },
  proposedSolution: { type: String },
  paymentMethod: { type: String },
  lastInteractionDate: { type: Date },
  internalComments: [{ type: String }],
  documents: [{
    url: { type: String },
    name: { type: String },
    type: { type: String }
  }],
  followUp: [{
    date: { type: Date },
    notes: { type: String }
  }],
  leadScore: { type: Number },
  region: { type: String },
  country: { type: String }
});

export default mongoose.model<IDeal>('Deal', DealSchema);
