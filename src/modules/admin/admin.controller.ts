import { AdminService } from "./admin.service";

const service = new AdminService();

export class AdminController {
  async getUsers(req: any, res: any) {
    try {
      const users = await service.getAllUsers();
      res.json(users);
    } catch (e: any) {
      res.status(500).json({ message: e.message });
    }
  }
}
