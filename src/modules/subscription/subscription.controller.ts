import { SubscriptionService } from "./subscription.service";

const service = new SubscriptionService();

export class SubscriptionController {
  async activate(req: any, res: any) {
    try {
      const { userId, type } = req.body;
      const data = await service.activateSubscription(userId, type);
      res.json(data);
    } catch (e: any) {
      res.status(400).json({ message: e.message });
    }
  }
  
  async get(req: any, res: any) {
    try {
      const data = await service.getSubscription(req.user.id);
      res.json(data);
    } catch (e: any) {
      res.status(400).json({ message: e.message });
    }
  }
}
