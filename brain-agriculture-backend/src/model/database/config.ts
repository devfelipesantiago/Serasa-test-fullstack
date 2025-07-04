import 'reflect-metadata';
import { DataSource } from "typeorm";
import { Producer } from "../entities/producer.entity";
import { Farm } from "../entities/farm.entity";
import { Harvest } from "../entities/harvest.entity";
import { Cultivate } from "../entities/cultivate.entity";
import { User } from "../entities/user.entity";
import * as dotenv from 'dotenv';

dotenv.config();

export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 3306,
  username: process.env.DB_USER || 'root',
  password: process.env.DB_PASS || 'test',
  database: process.env.DB_NAME || 'serasa',
  entities: [Producer, Farm, Harvest, Cultivate, User],
  synchronize: process.env.NODE_ENV === 'development',
  logging: process.env.NODE_ENV === 'development',
});

AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
    console.log(`Database: ${process.env.DB_NAME || 'serasa'} on ${process.env.DB_HOST || 'localhost'}:${process.env.DB_PORT || 3306}`);
  })
  .catch((err) => {
    console.error('Error during Data Source initialization', err);
    process.exit(1);
  });