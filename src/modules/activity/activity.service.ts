import { AppDataSource } from "../../config/data-source";
import { Activity } from "./activity.model";

const repo = AppDataSource.getRepository(Activity);

export class ActivityService {
  async getAll() {
    return repo.find();
  }

  async getById(id: number) {
    const activity = await repo.findOne({ where: { id } });
    if (!activity) throw new Error("Activity not found");
    return activity;
  }

  async create(data: any) {
    const activity = repo.create(data);
    await repo.save(activity);
    return activity;
  }

  async update(id: number, data: any) {
    const activity = await this.getById(id);
    repo.merge(activity, data);
    await repo.save(activity);
    return activity;
  }

  async delete(id: number) {
    const activity = await this.getById(id);
    await repo.remove(activity);
  }
}
