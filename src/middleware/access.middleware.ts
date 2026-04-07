import { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../config/data-source";
import { User, UserRole } from "../modules/user/user.model";

export const checkTrialOrSubscription = () => {
  return async (req: any, res: Response, next: NextFunction) => {
    try {
      const userId = req.user?.id;
      if (!userId) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      // Admins bypass trial/subscription limits
      if (req.user?.role === UserRole.ADMIN) {
        return next();
      }

      const userRepo = AppDataSource.getRepository(User);
      const user = await userRepo.findOne({
        where: { id: userId },
        relations: ["subscription"],
      });

      if (!user) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      // Check subscription
      if (user.subscription && user.subscription.isSubscribed) {
        return next();
      }

      // Check free trial
      const now = new Date();
      if (user.trialEndDate && user.trialEndDate > now) {
        return next();
      }

      return res.status(403).json({
        message: "Access Denied: Free trial has expired and you are not subscribed.",
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  };
};
