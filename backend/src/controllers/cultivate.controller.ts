import { Request, Response } from 'express';
import { CultivateService } from "../services/cultivate.service";

export class CultivateController {
  constructor(private cultivateService: CultivateService) { }

  async create(req: Request, res: Response) {
    const result = await this.cultivateService.createCultivate(req.body);
    return res.status(201).json(result);
  }

  async findAll(req: Request, res: Response) {
    const result = await this.cultivateService.findAll();
    return res.status(200).json(result);
  }

  async findById(req: Request, res: Response) {
    const result = await this.cultivateService.findById(Number(req.params.id));
    return res.status(200).json(result);
  }

  async update(req: Request, res: Response) {
    const result = await this.cultivateService.update(Number(req.params.id), req.body);
    return res.status(200).json(result);
  }

  async delete(req: Request, res: Response) {
    const result = await this.cultivateService.delete(Number(req.params.id));
    return res.status(200).json(result);
  }

  async getByIdHarvestAndFarm(req: Request, res: Response) {
    const result = await this.cultivateService.listByIdHarvestAndFarm(Number(req.params.id));
    return res.status(200).json(result);
  }

  async listByFarmId(req: Request, res: Response) {
    const result = await this.cultivateService.listByFarmId(Number(req.params.farmId));
    return res.status(200).json(result);
  }
}