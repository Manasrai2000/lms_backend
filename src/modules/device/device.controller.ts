import { DeviceService } from "./device.service";

const service = new DeviceService();

export class DeviceController {
  async getSession(req: any, res: any) {
    try {
      const data = await service.getCurrentSession(req.user.id);
      res.json(data);
    } catch (e: any) {
      res.status(400).json({ message: e.message });
    }
  }

  async clearSession(req: any, res: any) {
    try {
      await service.logoutFromAllDevices(req.user.id);
      res.json({ message: "Logged out from all devices" });
    } catch (e: any) {
      res.status(400).json({ message: e.message });
    }
  }
}
