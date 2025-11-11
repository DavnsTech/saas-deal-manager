// This is a TypeScript interface for data structure.
// If using an ORM like Prisma, this would be generated.
// If using Mongoose, this would be a Mongoose Schema.

export interface Deal {
    id: string;
    name: string;
    stage: string; // e.g., 'Prospecting', 'Qualification', 'Proposal', 'Negotiation', 'Closed Won', 'Closed Lost'
    value: number;
    description?: string;
    company?: string;
    contactPerson?: string;
    createdAt: Date;
    updatedAt: Date;
    // ownerId?: string; // Foreign key to User model
}
