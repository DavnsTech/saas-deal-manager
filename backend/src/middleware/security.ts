import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { jwtConfig } from '../config/jwt';
import { findUserById } from '../services/userService'; // Assuming you have a userService with this function

// Extend the Express Request interface to include user information
declare global {
    namespace Express {
        interface Request {
            user?: { id: string; email: string }; // Or whatever user properties you store in JWT
        }
    }
}

export const authenticateToken = async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (token == null) {
        return res.status(401).json({ message: 'Authorization token is required.' });
    }

    try {
        const payload = jwt.verify(token, jwtConfig.secret) as { id: string; email: string }; // Type assertion

        // Optional: Fetch user from DB to ensure user still exists and to attach full user object
        const user = await findUserById(payload.id);
        if (!user) {
            return res.status(401).json({ message: 'Invalid token: User not found.' });
        }

        req.user = { id: user.id, email: user.email }; // Attach user to request
        next();
    } catch (error) {
        console.error('JWT Verification Error:', error);
        return res.status(403).json({ message: 'Invalid token.' }); // Forbidden
    }
};

// Example of an authorization middleware (e.g., for admin roles)
export const authorizeRole = (requiredRole: string) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        if (!req.user) {
            // This should ideally be caught by authenticateToken, but as a safeguard:
            return res.status(401).json({ message: 'Authentication required.' });
        }

        // Assuming your user object (fetched in authenticateToken) has a 'role' property
        // You might need to adjust this based on how you store roles
        const user = await findUserById(req.user.id); // Re-fetch or ensure user object is complete
        if (!user || user.role !== requiredRole) {
            return res.status(403).json({ message: `Permission denied. Requires ${requiredRole} role.` });
        }

        next();
    };
};
