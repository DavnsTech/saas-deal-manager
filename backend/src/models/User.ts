// Assuming a simple in-memory store or a placeholder for a database model.
// In a real app, you'd use an ORM (e.g., Prisma, TypeORM, Sequelize).

export interface User {
  id: string;
  username: string;
  email: string;
  passwordHash: string; // Store hashed passwords, never plain text
  createdAt: Date;
  updatedAt: Date;
}

// Example of how you might interact with a user store (e.g., in-memory for demonstration)
let users: User[] = [];
let nextUserId = 1;

export const createUser = (userData: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): User => {
  const newUser: User = {
    ...userData,
    id: String(nextUserId++),
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  users.push(newUser);
  return newUser;
};

export const findUserByEmail = (email: string): User | undefined => {
  return users.find(user => user.email === email);
};

export const findUserById = (id: string): User | undefined => {
  return users.find(user => user.id === id);
};

export const getAllUsers = (): User[] => {
  return [...users]; // Return a copy to prevent external modification
};
