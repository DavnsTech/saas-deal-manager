import { Request, Response } from 'express';
import { UserModel } from '../models/User';
import { DealService } from '../services/dealService';

export const getCurrentUser = async (req: Request, res: Response) => {
  // `req.user` is populated by the `authenticateToken` middleware
  if (!req.user) {
    return res.sendStatus(401); // Should not happen if middleware is used correctly
  }

  try {
    // Fetch user details (excluding password hash)
    const user = await UserModel.findById(req.user.userId);
    if (!user) {
      return res.sendStatus(404);
    }
    // Return public user info
    res.json({ userId: user.id, username: user.username, email: user.email });
  } catch (error) {
    console.error('Get current user error:', error);
    res.status(500).json({ message: 'Internal server error fetching user details' });
  }
};

export const getUserDeals = async (req: Request, res: Response) => {
  const userId = req.user?.userId; // Get current authenticated user ID

  if (!userId) {
    return res.sendStatus(401);
  }

  try {
    const deals = await DealService.getDealsByOwner(userId);
    res.json(deals);
  } catch (error) {
    console.error('Get user deals error:', error);
    res.status(500).json({ message: 'Internal server error fetching user deals' });
  }
};
