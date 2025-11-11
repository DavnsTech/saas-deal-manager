import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { jwtConfig } from '../config/jwt';
import { createUser, findUserByEmail } from '../services/userService'; // Assuming these services exist
import { ValidationError, validationResult } from 'express-validator'; // For input validation

// Helper to generate JWT
const generateToken = (user: { id: string; email: string }) => {
    return jwt.sign(user, jwtConfig.secret, { expiresIn: jwtConfig.expiresIn });
};

export const register = async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        // Return validation errors
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password, name } = req.body; // Assume 'name' is also required

    try {
        const existingUser = await findUserByEmail(email);
        if (existingUser) {
            return res.status(409).json({ message: 'Email already in use.' }); // Conflict
        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Assuming createUser returns the created user object with an ID
        const newUser = await createUser({ email, password: hashedPassword, name }); // Pass name too

        // Optionally, generate a token upon registration
        const token = generateToken({ id: newUser.id, email: newUser.email });

        res.status(201).json({
            message: 'User registered successfully.',
            user: { id: newUser.id, email: newUser.email, name: newUser.name }, // Exclude password
            token,
        });
    } catch (error) {
        console.error('Registration Error:', error);
        res.status(500).json({ message: 'Internal server error during registration.' });
    }
};

export const login = async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
        const user = await findUserByEmail(email);
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials.' }); // Unauthorized
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials.' });
        }

        const token = generateToken({ id: user.id, email: user.email });

        res.status(200).json({
            message: 'Login successful.',
            user: { id: user.id, email: user.email, name: user.name }, // Exclude password
            token,
        });
    } catch (error) {
        console.error('Login Error:', error);
        res.status(500).json({ message: 'Internal server error during login.' });
    }
};

// Example of a protected route handler
export const getProfile = async (req: Request, res: Response) => {
    // The authenticateToken middleware has already verified the token and attached user info to req.user
    if (!req.user) {
        // Should not happen if authenticateToken is used correctly
        return res.status(401).json({ message: 'Authentication required.' });
    }

    try {
        // Fetch the full user object if needed, or use req.user directly
        const user = await findUserById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }
        res.status(200).json({
            id: user.id,
            email: user.email,
            name: user.name,
            // Add other non-sensitive user details
        });
    } catch (error) {
        console.error('Get Profile Error:', error);
        res.status(500).json({ message: 'Internal server error while fetching profile.' });
    }
};
