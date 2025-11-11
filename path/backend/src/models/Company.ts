import mongoose, { Schema, Document } from 'mongoose';

export interface ICompany extends Document {
  name: string;
  industry: string;
  size: string;
  website?: string;
  address: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  contactIds: string[];
  dealIds: string[];
  accountManagerId: string;
  annualRevenue?: number;
  numberOfEmployees?: number;
  isCustomer: boolean;
  customerSince?: Date;
  notes: string;
}

const CompanySchema: Schema = new Schema({
  name: { type: String, required: true },
  industry: { type: String, required: true },
  size: { type: String, required: true },
  website: { type: String },
  address: {
    street: { type: String },
    city: { type: String },
    state: { type: String },
    postalCode: { type: String },
    country: { type: String }
  },
  contactIds: [{ type: String }],
  dealIds: [{ type: String }],
  accountManagerId: { type: String, required: true },
  annualRevenue: { type: Number },
  numberOfEmployees: { type: Number },
  isCustomer: { type: Boolean, default: false },
  customerSince: { type: Date },
  notes: { type: String }
});

export default mongoose.model<ICompany>('Company', CompanySchema);
