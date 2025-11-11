import { User as UserType } from '../types';
import { v4 as uuidv4 } from 'uuid';

// In-memory database for demonstration purposes.
// In a real application, this would interact with a database (e.g., PostgreSQL, MongoDB).
const users: UserType[] = [];

export const UserModel = {
  async findByEmail(email: string): Promise<UserType | undefined> {
    return users.find((user) => user.email === email);
  },

  async findById(id: string): Promise<UserType | undefined> {
    return users.find((user) => user.id === id);
  },

  async create(userData: Omit<UserType, 'id' | 'passwordHash'> & { passwordHash: string }): Promise<UserType> {
    const newUser: UserType = {
      id: uuidv4(),
      ...userData,
    };
    users.push(newUser);
    // Return a copy without the sensitive passwordHash for security
    const { passwordHash, ...userWithoutPassword } = newUser;
    return userWithoutPassword;
  },

  // In a real app, you'd have update, delete, etc.
};
