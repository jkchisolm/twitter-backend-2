import { DataSource } from 'typeorm';
import Post from './entities/Post';
import RefreshToken from './entities/RefreshToken';
import User from './entities/User';

// eslint-disable-next-line import/prefer-default-export
export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: 5432,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: true,
  entities: [User, Post, RefreshToken],
});
