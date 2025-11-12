import { DataSource } from 'typeorm';
import dotenv from 'dotenv';
import { User } from '../models/User';
import { Deal } from '../models/Deal';

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432', 10),
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_NAME || 'deal_manager',
  synchronize: false, // Set to false, use migrations
  logging: false,
  entities: [User, Deal],
  migrations: [__dirname + '/../migrations/*.ts'],
  subscribers: [],
});
