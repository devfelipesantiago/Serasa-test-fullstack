import 'reflect-metadata';
import { DataSource } from "typeorm";
import { Producer } from "../entities/Producer.entity";
import { Farm } from "../entities/Farm.entity";
import { Harvest } from "../entities/Harvest.entity";
import { Cultivate } from "../entities/Cultivate.entity";
import * as dotenv from "dotenv";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT) || 3306,
  username: process.env.DB_USER || "root",
  password: process.env.DB_PASS || "test",
  database: process.env.DB_NAME || "serasa",
  entities: [Farm, Harvest, Cultivate, Producer],
  synchronize: true,
});

AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization", err);
  });