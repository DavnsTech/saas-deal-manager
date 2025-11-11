// JWT configuration
export const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkeythatshouldbeneverusedinproduction'; // Use environment variable in production
export const JWT_EXPIRES_IN = '1h'; // Token expiration time
