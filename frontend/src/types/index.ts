export interface Deal {
  id: string;
  name: string;
  company: string;
  value: number; // Or string, depending on how backend stores it
  stage: string;
  description?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// You can define other types here as needed, e.g., for User
export interface User {
  id: string;
  name: string;
  email: string;
}
