import { Request, Response } from 'express';
import { FarmService } from "../services/farm.service";

export class FarmController {
  constructor(private farmService: FarmService) { }

  async create(req: Request, res: Response) {
    const result = await this.farmService.createFarm(req.body);
    return res.status(201).json(result);
  }

  async findAll(req: Request, res: Response) {
    const result = await this.farmService.findAll();
    return res.status(200).json(result);
  }

  async findById(req: Request, res: Response) {
    const result = await this.farmService.findById(Number(req.params.id));
    return res.status(200).json(result);
  }

  async update(req: Request, res: Response) {
    const result = await this.farmService.update(Number(req.params.id), req.body);
    return res.status(200).json(result);
  }

  async delete(req: Request, res: Response) {
    const result = await this.farmService.delete(Number(req.params.id));
    return res.status(200).json(result);
  }

  async getHarvestsByFarmId(req: Request, res: Response) {
    const result = await this.farmService.findHarvestsByFarmId(Number(req.params.id));
    return res.status(200).json(result);
  }

  async getCultivatesByFarmId(req: Request, res: Response) {
    const result = await this.farmService.findCultivatesByFarmId(Number(req.params.id));
    return res.status(200).json(result);
  }

  async getProducerByFarmId(req: Request, res: Response) {
    const result = await this.farmService.findProducerByFarmId(Number(req.params.id));
    return res.status(200).json(result);
  }

  async findByState(req: Request, res: Response) {
    const result = await this.farmService.findByState(req.params.state);
    return res.status(200).json(result);
  }
}