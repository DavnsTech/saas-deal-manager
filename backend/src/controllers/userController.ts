import { Request, Response } from 'express';
import { AppDataSource } from '../config/database';
import { User } from '../models/User';
import { verifyToken } from '../middleware/security'; // Assuming verifyToken is in security.ts

const userRepository = AppDataSource.getRepository(User);

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await userRepository.find({ select: ['id', 'username', 'isActive'] }); // Exclude password
    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const user = await userRepository.findOne({ where: { id: parseInt(id, 10) }, select: ['id', 'username', 'isActive'] });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error(`Error fetching user ${id}:`, error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { username, isActive } = req.body; // Add other fields if needed, but be careful with password updates

  try {
    const user = await userRepository.findOneBy({ id: parseInt(id, 10) });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (username !== undefined) user.username = username;
    if (isActive !== undefined) user.isActive = isActive;

    await userRepository.save(user);
    res.status(200).json({ message: 'User updated successfully', user: { id: user.id, username: user.username, isActive: user.isActive } });
  } catch (error) {
    console.error(`Error updating user ${id}:`, error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await userRepository.delete(id);
    if (result.affected === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error(`Error deleting user ${id}:`, error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
