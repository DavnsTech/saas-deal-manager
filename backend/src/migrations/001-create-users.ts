import sequelize from '../config/database';
import User from '../models/User';

const createUsersTable = async () => {
  try {
    await sequelize.authenticate();
    await User.sync({ force: true }); // Use force: true to recreate table in development
    console.log('Users table created successfully.');
  } catch (error) {
    console.error('Unable to create users table:', error);
  } finally {
    await sequelize.close();
  }
};

createUsersTable();
