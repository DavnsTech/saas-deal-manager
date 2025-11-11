// Define interfaces for your application's data structures

export interface User {
  id: string;
  username: string;
  email: string;
  // Add other user properties as needed
}

export interface Deal {
  id: string;
  name: string;
  description?: string;
  stage: string; // e.g., 'Prospecting', 'Negotiation', 'Closed Won'
  value?: number;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  // Add any custom fields here
  // Example: customField?: string | number;
}

export interface CreateDealPayload {
  name: string;
  description?: string;
  stage: string;
  value?: number;
  // Include any other fields required for creating a deal
}

// Define prop types for components
export interface HeaderProps {
  user?: User | null; // User can be null if not logged in
}

export interface SidebarProps {
  // Potentially props for navigation or user info
}

export interface CreateDealFormProps {
  onSubmitSuccess: () => void; // Callback after successful deal creation
}

export interface DealDetailProps {
  dealId: string;
}

export interface DealsListProps {
  deals: Deal[];
  onDealSelect: (dealId: string) => void;
}
