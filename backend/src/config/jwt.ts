import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env file

export const jwtConfig = {
    secret: process.env.JWT_SECRET || 'supersecretkeydefault', // Use a strong secret in production
    expiresIn: process.env.JWT_EXPIRES_IN || '1h', // e.g., '1h', '7d', '24h'
};

if (!process.env.JWT_SECRET) {
    console.warn('JWT_SECRET is not set in environment variables. Using a default. Set JWT_SECRET for production.');
}
