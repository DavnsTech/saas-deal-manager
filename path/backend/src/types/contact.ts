export interface Contact {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  jobTitle?: string; // B2B specific
  companyId?: string; // B2B specific
  contactType: 'individual' | 'business';
  dealIds: string[];
  // B2C specific fields
  lifetimeValue?: number;
  // B2B specific fields
  decisionRole?: string;
  influenceLevel?: number;
  isPrimaryContact: boolean;
}
