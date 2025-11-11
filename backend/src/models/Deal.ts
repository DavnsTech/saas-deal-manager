import mongoose, { Schema, Document } from 'mongoose';
import { Deal as DealType } from '../types';

export interface IDeal extends DealType, Document {
  // You can add Mongoose-specific methods or properties here if needed
}

const dealSchema: Schema = new Schema({
  name: { type: String, required: true, trim: true },
  description: { type: String, trim: true },
  value: { type: Number, required: true },
  currency: { type: String, required: true, trim: true, uppercase: true },
  stage: { type: String, required: true, trim: true },
  customerId: { type: Schema.Types.ObjectId, ref: 'Customer', required: true }, // Assuming a Customer model exists
  assignedUserId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
}, {
  timestamps: true
});

export default mongoose.model<IDeal>('Deal', dealSchema);
