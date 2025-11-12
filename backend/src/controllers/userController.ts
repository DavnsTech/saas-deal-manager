import { Request, Response } from 'express';
import { AppDataSource } from '../config/database';
import { User } from '../models/User';

const userRepository = AppDataSource.getRepository(User);

export const getProfile = async (req: Request, res: Response) => {
  try {
    const user = await userRepository.findOneBy({ id: (req as any).user.id });
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({ id: user.id, email: user.email, name: user.name });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
