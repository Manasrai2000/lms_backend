import { AppDataSource } from "../../config/data-source";
import { DeviceSession } from "./device.model";

const deviceSessionRepo = AppDataSource.getRepository(DeviceSession);

export class DeviceService {
  async getCurrentSession(userId: number) {
    const session = await deviceSessionRepo.findOne({ where: { user: { id: userId } } });
    if (!session) return null;
    return session;
  }

  async logoutFromAllDevices(userId: number) {
    const session = await deviceSessionRepo.findOne({ where: { user: { id: userId } } });
    if (session) {
      await deviceSessionRepo.remove(session);
    }
  }
}
