import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { jwtConfig } from '../config/jwt';

// Extend Request interface to include user property
declare global {
    namespace Express {
        interface Request {
            user?: { userId: string; email: string };
        }
    }
}

export const authenticateJWT = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1]; // Expects "Bearer TOKEN"

        jwt.verify(token, jwtConfig.secret, (err, user) => {
            if (err) {
                return res.sendStatus(403); // Forbidden
            }
            // Attach user info to the request object
            req.user = user as { userId: string; email: string };
            next();
        });
    } else {
        res.sendStatus(401); // Unauthorized
    }
};

// Example of an authorization middleware (e.g., for admin roles)
export const authorizeAdmin = (req: Request, res: Response, next: NextFunction) => {
    // Assuming user roles are present in the JWT payload or fetched from DB
    // For this example, let's assume a 'role' property exists in req.user
    // In a real app, you'd likely fetch user from DB and check roles there.
    const isAdmin = (req as any).user?.role === 'admin'; // Example, requires role in JWT

    if (!isAdmin) {
        return res.status(403).json({ message: 'Admin access required' });
    }
    next();
};
