import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { userService } from '../services/userService'; // Assuming userService exists
import { jwtConfig } from '../config/jwt';

// Mock User model for demonstration
// In a real app, this would come from models/User.ts and potentially a DB
interface User {
    id: string;
    email: string;
    passwordHash: string;
}

// Mock userService for demonstration
const mockUserService = {
    findByEmail: async (email: string): Promise<User | null> => {
        // Simulate finding a user
        if (email === 'test@example.com') {
            const passwordHash = await bcrypt.hash('password123', 10);
            return { id: 'user-1', email: 'test@example.com', passwordHash };
        }
        return null;
    },
    create: async (userData: { email: string; passwordHash: string }): Promise<User> => {
        // Simulate creating a user
        const passwordHash = await bcrypt.hash(userData.passwordHash, 10);
        return { id: `user-${Math.random().toString(36).substring(7)}`, email: userData.email, passwordHash };
    }
};

export const authController = {
    register: async (req: Request, res: Response, next: NextFunction) => {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        try {
            const existingUser = await mockUserService.findByEmail(email);
            if (existingUser) {
                return res.status(409).json({ message: 'User already exists' });
            }

            const passwordHash = await bcrypt.hash(password, 10);
            const newUser = await mockUserService.create({ email, passwordHash });

            // In a real app, you might return the user without the password hash
            const userWithoutPassword = { id: newUser.id, email: newUser.email };
            res.status(201).json({ message: 'User registered successfully', user: userWithoutPassword });

        } catch (error) {
            next(error); // Pass to global error handler
        }
    },

    login: async (req: Request, res: Response, next: NextFunction) => {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        try {
            const user = await mockUserService.findByEmail(email);
            if (!user) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }

            const isMatch = await bcrypt.compare(password, user.passwordHash);
            if (!isMatch) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }

            const token = jwt.sign({ userId: user.id, email: user.email }, jwtConfig.secret, {
                expiresIn: jwtConfig.expiresIn,
            });

            // In a real app, you might return the user without the password hash
            const userWithoutPassword = { id: user.id, email: user.email };
            res.status(200).json({ message: 'Login successful', token, user: userWithoutPassword });

        } catch (error) {
            next(error); // Pass to global error handler
        }
    },
};
