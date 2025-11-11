import dotenv from 'dotenv';

dotenv.config();

export const jwtConfig = {
    secret: process.env.JWT_SECRET || 'DEFAULT_SUPER_SECRET_KEY_CHANGE_ME', // !!! IMPORTANT: Use a strong, unique secret from .env !!!
    expiresIn: process.env.JWT_EXPIRES_IN || '1h', // e.g., '1h', '7d'
};

if (process.env.JWT_SECRET === undefined) {
    console.warn('JWT_SECRET not set in environment variables. Using a default, insecure secret.');
}
