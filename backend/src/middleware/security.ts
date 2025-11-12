import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey';

// Interface to extend Express Request to include user information
interface AuthenticatedRequest extends Request {
  user?: {
    userId: number;
    username: string;
  };
}

export const authenticateToken = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (token == null) {
    return res.sendStatus(401); // If no token is provided
  }

  jwt.verify(token, JWT_SECRET, (err: any, user: any) => {
    if (err) {
      console.error('Token verification error:', err);
      return res.sendStatus(403); // If token is invalid
    }
    req.user = user; // Attach user info to request
    next();
  });
};

// Example of how you might use this in a route:
// import { authenticateToken } from '../middleware/security';
// router.get('/protected-data', authenticateToken, (req: AuthenticatedRequest, res) => {
//   res.json({ message: `Hello ${req.user.username}, this is protected data!` });
// });

// You can also create role-based authorization if needed.
// For now, 'authenticateToken' is the primary security middleware.
