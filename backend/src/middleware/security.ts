import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import { JWT_SECRET } from '../config/jwt'; // Assuming JWT_SECRET is exported from jwt.ts

interface AuthenticatedRequest extends Request {
    user?: User; // Augment Request interface to include user
}

export const protect = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Get token from header
            token = req.headers.authorization.split(' ')[1];

            // Verify token
            const decoded = jwt.verify(token, JWT_SECRET) as { id: number };

            // Get user from the token (exclude password)
            req.user = await User.findByPk(decoded.id, {
                attributes: { exclude: ['password'] }
            });

            if (!req.user) {
                res.status(401).json({ message: 'Not authorized, user not found' });
                return;
            }

            next();
        } catch (error) {
            console.error('Token verification error:', error);
            res.status(401).json({ message: 'Not authorized, token failed' });
        }
    }

    if (!token) {
        res.status(401).json({ message: 'Not authorized, no token' });
    }
};

// Example of an authorization middleware if needed (e.g., for admin roles)
// export const authorize = (...roles) => {
//     return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
//         if (!req.user) {
//             return res.status(401).json({ message: 'Not authorized' });
//         }
//         if (!roles.includes(req.user.role)) {
//             return res.status(403).json({ message: `User role ${req.user.role} is not authorized to access this route` });
//         }
//         next();
//     };
// };
