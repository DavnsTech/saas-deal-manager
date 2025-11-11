import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt'; // For password hashing
import jwtConfig from '../config/jwt';
import { createUser, findUserByEmail } from '../models/User';

// Number of salt rounds for bcrypt
const SALT_ROUNDS = 10;

export const register = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: 'Username, email, and password are required.' });
  }

  try {
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      return res.status(409).json({ message: 'User with this email already exists.' });
    }

    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    const newUser = createUser({
      username,
      email,
      passwordHash: hashedPassword,
    });

    // Generate JWT for the newly registered user
    const token = jwt.sign(
      { id: newUser.id, username: newUser.username, email: newUser.email },
      jwtConfig.secret,
      { expiresIn: jwtConfig.expiresIn }
    );

    res.status(201).json({
      message: 'User registered successfully!',
      token,
      user: {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email,
      },
    });
  } catch (error) {
    console.error('Registration Error:', error);
    res.status(500).json({ message: 'An error occurred during registration.' });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required.' });
  }

  try {
    const user = await findUserByEmail(email);
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    // Compare the provided password with the hashed password
    const passwordMatch = await bcrypt.compare(password, user.passwordHash);

    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    // Generate JWT for the logged-in user
    const token = jwt.sign(
      { id: user.id, username: user.username, email: user.email },
      jwtConfig.secret,
      { expiresIn: jwtConfig.expiresIn }
    );

    res.status(200).json({
      message: 'Login successful!',
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    console.error('Login Error:', error);
    res.status(500).json({ message: 'An error occurred during login.' });
  }
};
