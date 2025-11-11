import mongoose, { Document, Schema } from 'mongoose';

export interface IDeal extends Document {
  name: string;
  amount: number;
  currency: string;
  status: string;
  stage: string;
  leadSource: string;
  priority: string;
  closingProbability: number;
  createdAt: Date;
  expectedCloseDate: Date;
  salesOwner: string;
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
  internalComments: string;
  attachedDocuments: string[];
  followUpTracking: string;
  leadScore: number;
  estimatedLifetimeValue: number;
  region: string;
  country: string;
}

const DealSchema: Schema = new Schema({
  name: { type: String, required: true },
  amount: { type: Number, required: true },
  currency: { type: String, required: true },
  status: { type: String, required: true },
  stage: { type: String, required: true },
  leadSource: { type: String, required: true },
  priority: { type: String, required: true },
  closingProbability: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
  expectedCloseDate: { type: Date, required: true },
  salesOwner: { type: String, required: true },
  company: { type: String, required: true },
  primaryContact: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  industry: { type: String, required: true },
  companySize: { type: String, required: true },
  acquisitionChannel: { type: String, required: true },
  identifiedNeed: { type: String, required: true },
  proposedSolution: { type: String, required: true },
  contractType: { type: String, required: true },
  contractDuration: { type: String, required: true },
  paymentMethod: { type: String, required: true },
  lastInteractionDate: { type: Date, default: Date.now },
  internalComments: { type: String },
  attachedDocuments: [{ type: String }],
  followUpTracking: { type: String },
  leadScore: { type: Number, required: true },
  estimatedLifetimeValue: { type: Number, required: true },
  region: { type: String, required: true },
  country: { type: String, required: true }
});

export default mongoose.model<IDeal>('Deal', DealSchema);
