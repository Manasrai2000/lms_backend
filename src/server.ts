// Must be FIRST import — required for TypeORM decorators to work correctly
import "reflect-metadata";

import app from "./app";
import { AppDataSource } from "./config/data-source";
import { env } from "./config/env";

const PORT = env.port || 3000;

AppDataSource.initialize()
  .then(() => {
    console.log("✅ Database connected");

    // Always start the HTTP server (Render is a real server, not serverless)
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`📖 API docs: https://lms-backend-tpz2.onrender.com/docs`);
    });
  })
  .catch((err) => {
    console.error("❌ DB connection failed:", err.message);
    process.exit(1); // Crash fast so Render restarts and surfaces the real error
  });

// Export for Vercel (serverless) — Vercel won't call app.listen()
export default app;