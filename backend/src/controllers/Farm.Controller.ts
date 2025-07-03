import { Request, Response } from 'express';
import { FarmService } from "../services/Farm.Service";

export class FarmController {
  private farmService: FarmService;

  constructor(farmService: FarmService) {
    this.farmService = farmService;
  }

  async create(req: Request, res: Response) {
    const farm = await this.farmService.createFarm(req.body);
    return res.status(201).json(farm);
  }

  async findAll(req: Request, res: Response) {
    const farms = await this.farmService.findAll();
    return res.json(farms);
  }

  async findById(req: Request, res: Response) {
    const farm = await this.farmService.findById(Number(req.params.id));    
    return res.json(farm);
  }

  async update(req: Request, res: Response) {
    const farm = await this.farmService.update(Number(req.params.id), req.body);
    return res.json(farm);
  }

  async delete(req: Request, res: Response) {
    await this.farmService.delete(Number(req.params.id));
    return res.status(204).send();
  }

  async getHarvestsByFarmId(req: Request, res: Response) {
    const harvests = await this.farmService.findHarvestsByFarmId(Number(req.params.farmId));
    return res.status(200).json(harvests);
  }

  async getCultivatesByFarmId(req: Request, res: Response) {
    const cultivates = await this.farmService.findCultivatesByFarmId(Number(req.params.farmId));
    return res.status(200).json(cultivates);
  }
}