// Interface for a Deal object
export interface Deal {
    id: string;
    name: string;
    stage: string; // e.g., 'Prospecting', 'Qualified', 'Proposal', 'Negotiation', 'Closed Won', 'Closed Lost'
    value: number;
    createdAt: Date;
    updatedAt: Date;
    customFields?: { [key: string]: any }; // Flexible for custom fields
}

// Interface for creating a new deal (id, createdAt, updatedAt are generated)
export interface DealInput {
    name: string;
    stage?: string;
    value?: number;
    customFields?: { [key: string]: any };
}

// Interface for updating a deal (all fields optional)
export interface DealUpdate {
    name?: string;
    stage?: string;
    value?: number;
    customFields?: { [key: string]: any };
}
