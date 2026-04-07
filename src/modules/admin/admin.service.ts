import { AppDataSource } from "../../config/data-source";
import { User } from "../user/user.model";

const userRepo = AppDataSource.getRepository(User);

export class AdminService {
  async getAllUsers() {
    return userRepo.find({
      relations: ["deviceSessions", "subscription"],
      select: {
        id: true,
        fullName: true,
        email: true,
        role: true,
        lastLoginAt: true,
        createdAt: true,
        deviceSessions: {
            deviceId: true,
            browser: true,
            os: true,
            ipAddress: true,
            lastLoginAt: true,
            isActive: true
        }
      },
      order: {
        createdAt: "DESC"
      }
    });
  }
}
