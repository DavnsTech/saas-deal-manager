// Global types
export interface UserPayload {
  id: number;
  email: string;
}

export interface DealData {
  name: string;
  amount?: number;
  currency?: string;
  status?: string;
  stage: string;
  // Add more fields
}
