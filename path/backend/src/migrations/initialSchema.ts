// This file represents the initial database schema setup
// In a real application, you would use a migration tool like migrate-mongo

import mongoose from 'mongoose';
import connectDB from '../config/database';
import Deal from '../models/Deal';
import Company from '../models/Company';
import Contact from '../models/Contact';
import User from '../models/User';

const setupInitialSchema = async () => {
  await connectDB();
  
  // Create indexes for better query performance
  await Deal.collection.createIndexes([
    { key: { ownerId: 1 } },
    { key: { contactId: 1 } },
    { key: { companyId: 1 } },
    { key: { stage: 1 } },
    { key: { status: 1 } },
    { key: { dealType: 1 } }
  ]);
  
  await Company.collection.createIndexes([
    { key: { accountManagerId: 1 } },
    { key: { isCustomer: 1 } }
  ]);
  
  await Contact.collection.createIndexes([
    { key: { companyId: 1 } },
    { key: { email: 1 }, unique: true }
  ]);
  
  await User.collection.createIndexes([
    { key: { email: 1 }, unique: true }
  ]);
  
  console.log('Initial schema setup completed');
  process.exit(0);
};

// Run this script to set up the initial schema
if (require.main === module) {
  setupInitialSchema().catch(console.error);
}
