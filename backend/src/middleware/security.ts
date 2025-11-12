import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../config/jwt';

export const securityMiddleware = (req: Request, res: Response, next: NextFunction) => {
  // Basic security headers are handled by helmet
  next();
};

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ message: 'No token provided' });

  try {
    const decoded = verifyToken(token);
    (req as any).user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};
