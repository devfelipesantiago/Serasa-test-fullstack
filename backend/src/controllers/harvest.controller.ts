import { Request, Response } from 'express';
import { HarvestService } from "../services/harvest.service";

export class HarvestController {
  constructor(private harvestService: HarvestService) { }

  async create(req: Request, res: Response) {
    const result = await this.harvestService.createHarvest(req.body);
    return res.status(201).json(result);
  }

  async findAll(req: Request, res: Response) {
    const result = await this.harvestService.findAll();
    return res.status(200).json(result);
  }

  async findById(req: Request, res: Response) {
    const result = await this.harvestService.findById(Number(req.params.id));
    return res.status(200).json(result);
  }

  async update(req: Request, res: Response) {
    const result = await this.harvestService.update(Number(req.params.id), req.body);
    return res.status(200).json(result);
  }

  async delete(req: Request, res: Response) {
    const result = await this.harvestService.delete(Number(req.params.id));
    return res.status(200).json(result);
  }

  async getFarmByHarvestId(req: Request, res: Response) {
    const result = await this.harvestService.findFarmByHarvestId(Number(req.params.id));
    return res.status(200).json(result);
  }

  async getCultivatesByHarvestId(req: Request, res: Response) {
    const result = await this.harvestService.findCultivatesByHarvestId(Number(req.params.id));
    return res.status(200).json(result);
  }
}