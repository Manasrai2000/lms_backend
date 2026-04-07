import { AppDataSource } from "../../config/data-source";
import { User } from "../user/user.model";
import { Subscription, SubscriptionType } from "./subscription.model";

const userRepo = AppDataSource.getRepository(User);
const subscriptionRepo = AppDataSource.getRepository(Subscription);

export class SubscriptionService {
  async activateSubscription(userId: number, type: SubscriptionType) {
    const user = await userRepo.findOne({ where: { id: userId }, relations: ["subscription"] });
    if (!user) throw new Error("User not found");

    if (user.subscription) {
      user.subscription.isSubscribed = true;
      user.subscription.subscriptionType = type;
      user.subscription.subscribedAt = new Date();
      await subscriptionRepo.save(user.subscription);
      return user.subscription;
    } else {
      const newSub = subscriptionRepo.create({
        user,
        isSubscribed: true,
        subscriptionType: type,
        subscribedAt: new Date()
      });
      await subscriptionRepo.save(newSub);
      return newSub;
    }
  }

  async getSubscription(userId: number) {
    const sub = await subscriptionRepo.findOne({ where: { user: { id: userId } } });
    if (!sub) return { isSubscribed: false };
    return sub;
  }
}
