export interface Company {
  _id: string;
  name: string;
  industry: string;
  size: string; // e.g., "1-10", "11-50", "51-200", etc.
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
