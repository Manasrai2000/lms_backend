// Must be FIRST import — required for TypeORM decorators to work correctly
import "reflect-metadata";

import app from "./app";
import { AppDataSource } from "./config/data-source";
import { env } from "./config/env";

// Initialize DB connection once (works for both local and Render)
let isInitialized = false;

const initializeDb = async () => {
  if (!isInitialized && !AppDataSource.isInitialized) {
    await AppDataSource.initialize();
    isInitialized = true;
    console.log("Database connected");
  }
};

initializeDb().catch((err) => {
  console.error("DB connection error:", err);
});

// For local development: start the HTTP server
if (process.env.NODE_ENV !== "production") {
  app.listen(env.port, () => {
    console.log(`Server running on port ${env.port}`);
    console.log(`API docs: http://localhost:${env.port}/docs`);
  });
}

// Export for Render/Vercel serverless
export default app;