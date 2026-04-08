import "reflect-metadata";
import { DataSource } from "typeorm";
import { env } from "./env";
import { User } from "../modules/user/user.model";
import { Activity } from "../modules/activity/activity.model";
import { Subscription } from "../modules/subscription/subscription.model";
import { DeviceSession } from "../modules/device/device.model";

const isProduction = process.env.NODE_ENV === "production";

const entities = [User, Activity, Subscription, DeviceSession];
const migrations = isProduction
  ? ["dist/migrations/*.js"]
  : ["src/migrations/*.ts"];

export const AppDataSource = new DataSource(
  env.db.url
    ? {
        // Neon / Production: use DATABASE_URL
        type: "postgres",
        url: env.db.url,
        ssl: { rejectUnauthorized: false },
        synchronize: false,
        logging: false,
        entities,
        migrations,
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
        entities,
        migrations,
      }
);