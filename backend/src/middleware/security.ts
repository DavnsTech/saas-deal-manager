import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import jwtConfig from '../config/jwt';
import { findUserById } from '../models/User'; // Assuming User model has a way to fetch user by ID

// Augment the Express Request interface to include user information
declare global {
  namespace Express {
    interface Request {
      user?: { id: string; username: string; email: string };
    }
  }
}

export const authenticateToken = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (token == null) {
    return res.status(401).json({ message: 'Authentication token is required.' });
  }

  try {
    const decoded = jwt.verify(token, jwtConfig.secret) as { id: string; username: string; email: string };

    // Optional: Fetch user from DB to ensure token is still valid for an active user
    // This adds overhead but increases security if users can be deactivated.
    const user = await findUserById(decoded.id);
    if (!user) {
      return res.status(401).json({ message: 'Invalid token: User not found.' });
    }

    // Attach user info to the request object
    req.user = {
      id: user.id,
      username: user.username,
      email: user.email,
    };
    next();
  } catch (error) {
    console.error('JWT Verification Error:', error.message);
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({ message: 'Authentication token has expired.' });
    }
    return res.status(403).json({ message: 'Invalid authentication token.' });
  }
};

export const authorizeRole = (requiredRole: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    // This is a placeholder. In a real app, user object would have a role property.
    // For now, we assume all authenticated users can perform actions unless specifically restricted.
    // Example: if (req.user && req.user.role === requiredRole) { next(); } else { res.status(403).json({ message: 'Forbidden: Insufficient permissions.' }); }
    next(); // Allow access for now, refine role-based access control later
  };
};
