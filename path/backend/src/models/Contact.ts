import mongoose, { Schema, Document } from 'mongoose';

export interface IContact extends Document {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  jobTitle?: string;
  companyId?: string;
  contactType: 'individual' | 'business';
  dealIds: string[];
  lifetimeValue?: number;
  decisionRole?: string;
  influenceLevel?: number;
  isPrimaryContact: boolean;
}

const ContactSchema: Schema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  jobTitle: { type: String },
  companyId: { type: String },
  contactType: { 
    type: String, 
    enum: ['individual', 'business'], 
    required: true 
  },
  dealIds: [{ type: String }],
  lifetimeValue: { type: Number },
  decisionRole: { type: String },
  influenceLevel: { type: Number },
  isPrimaryContact: { type: Boolean, default: false }
});

export default mongoose.model<IContact>('Contact', ContactSchema);
