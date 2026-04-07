import { ActivityService } from "./activity.service";

const service = new ActivityService();

export class ActivityController {
  async getAll(req: any, res: any) {
    const data = await service.getAll();
    res.json(data);
  }

  async getById(req: any, res: any) {
    try {
      const data = await service.getById(Number(req.params.id));
      res.json(data);
    } catch (e: any) {
      res.status(404).json({ message: e.message });
    }
  }

  async create(req: any, res: any) {
    const data = await service.create(req.body);
    res.status(201).json(data);
  }

  async update(req: any, res: any) {
    try {
      const data = await service.update(Number(req.params.id), req.body);
      res.json(data);
    } catch (e: any) {
      res.status(404).json({ message: e.message });
    }
  }

  async delete(req: any, res: any) {
    try {
      await service.delete(Number(req.params.id));
      res.status(204).send();
    } catch (e: any) {
      res.status(404).json({ message: e.message });
    }
  }
}
