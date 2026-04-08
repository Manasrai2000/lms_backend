import "reflect-metadata";
import { DataSource } from "typeorm";
import { env } from "./env";
import { User } from "../modules/user/user.model";
import { Activity } from "../modules/activity/activity.model";
import { Subscription } from "../modules/subscription/subscription.model";
import { DeviceSession } from "../modules/device/device.model";
import path from "path";

// Detect if running as compiled JS (Render/production) or TypeScript (ts-node/dev)
// __filename ends with '.ts' in ts-node, '.js' in compiled production
const ext = __filename.endsWith(".ts") ? "*.ts" : "*.js";
const migrationsPath = path.join(__dirname, `../migrations/${ext}`);

const entities = [User, Activity, Subscription, DeviceSession];

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
        migrations: [migrationsPath],
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
        migrations: [migrationsPath],
      }
);