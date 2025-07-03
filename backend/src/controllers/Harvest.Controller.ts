import { Request, Response } from 'express';
import { HarvestService } from "../services/Harvest.Service";

export class HarvestController {
  private harvestService: HarvestService;

  constructor(harvestService: HarvestService) {
    this.harvestService = harvestService;
  }

  async create(req: Request, res: Response) {
    const harvest = await this.harvestService.createHarvest(req.body);
    return res.status(201).json(harvest);
  }

  async findAll(req: Request, res: Response) {
    const harvests = await this.harvestService.findAll();
    return res.json(harvests);
  }

  async findById(req: Request, res: Response) {
    const harvest = await this.harvestService.findById(Number(req.params.id));
    return res.json(harvest);
  }

  async update(req: Request, res: Response) {
    const harvest = await this.harvestService.update(Number(req.params.id), req.body);
    return res.json(harvest);
  }

  async delete(req: Request, res: Response) {
    await this.harvestService.delete(Number(req.params.id));
    return res.status(204).send();
  }

  async getCultivatesByHarvestId(req: Request, res: Response) {
    const cultivates = await this.harvestService.findCultivatesByHarvestId(Number(req.params.harvestId));
    return res.json(cultivates);
  }

  async getHaverstWithCultivatesAndFarmsById(req: Request, res: Response) {
    const harvest = await this.harvestService.findHaverstWithCultivatesAndFarmsById(Number(req.params.harvestId));
    return res.json(harvest);
   }
}