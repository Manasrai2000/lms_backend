import "reflect-metadata";
import { DataSource } from "typeorm";
import { env } from "./env";

const isProduction = process.env.NODE_ENV === "production";

export const AppDataSource = new DataSource(
  env.db.url
    ? {
        // Neon / Production: use DATABASE_URL
        type: "postgres",
        url: env.db.url,
        ssl: { rejectUnauthorized: false },
        synchronize: false,
        logging: false,
        entities: isProduction
          ? ["dist/modules/**/*.model.js"]
          : ["src/modules/**/*.model.ts"],
        migrations: isProduction
          ? ["dist/migrations/*.js"]
          : ["src/migrations/*.ts"],
      }
    : {
        // Local development: use individual env vars
        type: "postgres",
        host: env.db.host,
        port: env.db.port,
        username: env.db.username,
        password: env.db.password,
        database: env.db.database,
        synchronize: false,
        logging: false,
        entities: ["src/modules/**/*.model.ts"],
        migrations: ["src/migrations/*.ts"],
      }
);