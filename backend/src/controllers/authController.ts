import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { User } from '../models/User';
import { generateToken } from '../config/jwt';

export const register = async (req: Request, res: Response) => {
  try {
    const { username, email, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await User.create({ username, email, password: hashedPassword, role: role || 'user' });
    const token = generateToken({ id: user.id, username: user.username, role: user.role });
    res.status(201).json({ user: { id: user.id, username: user.username, email: user.email, role: user.role }, token });
  } catch (error) {
    res.status(400).json({ error: 'Registration failed' });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const token = generateToken({ id: user.id, username: user.username, role: user.role });
    res.json({ user: { id: user.id, username: user.username, email: user.email, role: user.role }, token });
  } catch (error) {
    res.status(400).json({ error: 'Login failed' });
  }
};
