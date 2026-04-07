import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { env } from "../config/env";
import { AppDataSource } from "../config/data-source";
import { DeviceSession } from "../modules/device/device.model";

export const authMiddleware = (roles: string[] = []) => {
  return async (req: any, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    try {
      const decoded: any = jwt.verify(token, env.jwtSecret);

      if (roles.length && !roles.includes(decoded.role))
        return res.status(403).json({ message: "Forbidden" });

      const deviceIdFromHeader = req.headers["x-device-id"];

      if (deviceIdFromHeader) {
        // Enforce Single Device Login
        const deviceSessionRepo = AppDataSource.getRepository(DeviceSession);
        const deviceSession = await deviceSessionRepo.findOne({
          where: { user: { id: decoded.id } },
        });

        if (deviceSession && deviceSession.deviceId !== deviceIdFromHeader) {
          return res.status(401).json({ message: "Session expired due to login from another device." });
        }
      }

      req.user = decoded;
      next();
    } catch {
      return res.status(401).json({ message: "Invalid token" });
    }
  };
};