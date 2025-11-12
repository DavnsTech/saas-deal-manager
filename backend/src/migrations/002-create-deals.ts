import sequelize from '../config/database';
import Deal from '../models/Deal';

const createDealsTable = async () => {
  try {
    await sequelize.authenticate();
    await Deal.sync({ force: true }); // Use force: true to recreate table in development
    console.log('Deals table created successfully.');
  } catch (error) {
    console.error('Unable to create deals table:', error);
  } finally {
    await sequelize.close();
  }
};

createDealsTable();
