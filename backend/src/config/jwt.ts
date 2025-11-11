import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env file

// Define the JWT configuration
interface JwtConfig {
  secret: string;
  expiresIn: string;
}

const jwtConfig: JwtConfig = {
  // Use environment variable for JWT secret, fallback to a default if not set (though a fallback is not recommended for production)
  secret: process.env.JWT_SECRET || 'your_super_secret_key_change_me',
  // Define token expiration time (e.g., '1h' for 1 hour, '7d' for 7 days)
  expiresIn: process.env.JWT_EXPIRES_IN || '24h',
};

if (process.env.JWT_SECRET === undefined) {
  console.warn('JWT_SECRET environment variable is not set. Using a default secret. This is insecure for production!');
}

export default jwtConfig;
