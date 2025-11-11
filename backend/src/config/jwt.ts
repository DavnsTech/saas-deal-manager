import dotenv from 'dotenv';

dotenv.config();

export const JWT_SECRET = process.env.JWT_SECRET || 'your_super_secret_key_for_development';
export const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1h';
