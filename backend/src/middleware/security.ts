import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { JWT_SECRET } from '../config/jwt';
import { DecodedToken } from '../types';
import { UserModel } from '../models/User';

// Middleware to verify JWT
export const authenticateToken = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (token == null) {
    return res.sendStatus(401); // If no token is provided
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as DecodedToken;
    // Optional: Check if user still exists in DB
    const user = await UserModel.findById(decoded.userId);
    if (!user) {
      return res.sendStatus(403); // User not found
    }
    // Attach user info to request for downstream use
    req.user = { userId: decoded.userId, username: decoded.username };
    next();
  } catch (error) {
    console.error('JWT Verification Error:', error);
    return res.sendStatus(403); // Invalid token
  }
};

// Middleware to check if the authenticated user is the owner of the resource (e.g., a deal)
export const isResourceOwner = (resourceType: 'deal') => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user?.userId;
    if (!userId) {
      return res.sendStatus(401); // Should not happen if authenticateToken runs first
    }

    try {
      if (resourceType === 'deal') {
        const dealId = req.params.dealId; // Assuming deal ID is in params
        if (!dealId) {
          return res.status(400).json({ message: 'Deal ID is required for ownership check' });
        }
        const deal = await DealModel.findById(dealId); // Need DealModel here

        if (!deal) {
          return res.sendStatus(404); // Deal not found
        }

        if (deal.ownerId !== userId) {
          return res.sendStatus(403); // Forbidden: User is not the owner
        }
      } else {
        // Handle other resource types if needed
        return res.sendStatus(501); // Not Implemented
      }

      next();
    } catch (error) {
      console.error(`Ownership check error for ${resourceType}:`, error);
      res.sendStatus(500);
    }
  };
};

// Extend Request type to include user information
declare module 'express-serve-static-core' {
  interface Request {
    user?: { userId: string; username: string };
  }
}
