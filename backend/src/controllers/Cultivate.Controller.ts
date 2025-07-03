import { Request, Response } from 'express';
import { CultivateService } from "../services/Cultivate.Service";

export class CultivateController {
  private cultivateService: CultivateService;

  constructor(cultivateService: CultivateService) {
    this.cultivateService = cultivateService;
  }

  async create(req: Request, res: Response) {
    const cultivate = await this.cultivateService.createCultivate(req.body);
    return res.status(201).json(cultivate);
  }

  async findAll(req: Request, res: Response) {
    const cultivates = await this.cultivateService.findAll();
    return res.json(cultivates);
  }

  async findById(req: Request, res: Response) {
    const cultivate = await this.cultivateService.findById(Number(req.params.id));
    if (!cultivate) throw new Error('Not found');
    return res.json(cultivate);
  }

  async update(req: Request, res: Response) {
    const cultivate = await this.cultivateService.update(Number(req.params.id), req.body);
    return res.json(cultivate);
  }

  async delete(req: Request, res: Response) {
    await this.cultivateService.delete(Number(req.params.id));
    return res.status(204).send();
  }

  async getCultivateByHarvestId(req: Request, res: Response) {
    const cultivates = await this.cultivateService.listByHarvestId(Number(req.params.harvestId));
    return res.json(cultivates);
  }
}