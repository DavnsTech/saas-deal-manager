export interface Deal {
  id: number;
  name: string;
  amount: number;
  currency: string;
  stage: string;
  // Add other fields based on custom fields
}

export interface User {
  id: number;
  name: string;
  email: string;
}
