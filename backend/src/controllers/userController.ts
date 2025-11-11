import { Request, Response, NextFunction } from 'express';
import User, { IUser } from '../models/User';
import { UserPayload, AuthRequest } from '../types';

export const getCurrentUser = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Authentication required' });
    }
    // Fetch full user details from DB based on ID in payload
    const user = await User.findById(req.user.userId).select('-passwordHash'); // Exclude password hash
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

export const getAllUsers = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    // This route should ideally be protected by an 'admin' role
    const users = await User.find().select('-passwordHash'); // Exclude password hash
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};
