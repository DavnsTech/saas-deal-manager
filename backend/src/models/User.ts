export interface User {
    id: string;
    email: string;
    passwordHash: string; // Should never be exposed directly outside auth service
    firstName?: string;
    lastName?: string;
    role?: 'admin' | 'user'; // Example role
    createdAt: Date;
    updatedAt: Date;
}
