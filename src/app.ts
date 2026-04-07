import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";

import { errorMiddleware } from "./middleware/error.middleware";
import { setupSwagger } from "./config/swagger";
import authRoutes from "./modules/auth/auth.route";
import userRoutes from "./modules/user/user.routes";
import activityRoutes from "./modules/activity/activity.routes";
import subscriptionRoutes from "./modules/subscription/subscription.routes";
import deviceRoutes from "./modules/device/device.routes";
import adminRoutes from "./modules/admin/admin.routes";

const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/activities", activityRoutes);
app.use("/api/subscription", subscriptionRoutes);
app.use("/api/device", deviceRoutes);
app.use("/api/admin", adminRoutes);

app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

app.use(errorMiddleware);

setupSwagger(app);

export default app;