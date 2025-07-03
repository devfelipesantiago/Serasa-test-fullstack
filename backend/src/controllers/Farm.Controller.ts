import { Request, Response } from 'express';
import { FarmService } from "../services/Farm.Service";

export class FarmController {
  private farmService: FarmService;

  constructor(farmService: FarmService) {
    this.farmService = farmService;
  }

  async create(req: Request, res: Response) {
    try {
      const farm = await this.farmService.createFarm(req.body);
      return res.status(201).json(farm);
    } catch (error) {
      const errMsg = error instanceof Error ? error.message : String(error);
      return res.status(400).json({ error: errMsg });
    }
  }

  async findAll(req: Request, res: Response) {
    try {
      const farms = await this.farmService.findAll();
      return res.json(farms);
    } catch (error) {
      const errMsg = error instanceof Error ? error.message : String(error);
      return res.status(500).json({ error: errMsg });
    }
  }

  async findById(req: Request, res: Response) {
    try {
      const farm = await this.farmService.findById(Number(req.params.id));
      if (!farm) return res.status(404).json({ error: 'Not found' });
      return res.json(farm);
    } catch (error) {
      const errMsg = error instanceof Error ? error.message : String(error);
      return res.status(500).json({ error: errMsg });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const farm = await this.farmService.update(Number(req.params.id), req.body);
      return res.json(farm);
    } catch (error) {
      const errMsg = error instanceof Error ? error.message : String(error);
      return res.status(400).json({ error: errMsg });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      await this.farmService.delete(Number(req.params.id));
      return res.status(204).send();
    } catch (error) {
      const errMsg = error instanceof Error ? error.message : String(error);
      return res.status(400).json({ error: errMsg });
    }
  }

  async getHarvestsByFarmId(req: Request, res: Response) {
    try {
      const { farmId } = req.params;
      const harvests = await this.farmService.findHarvestsByFarmId(Number(farmId));
      return res.status(200).json(harvests);
    } catch (error) {
      const errMsg = error instanceof Error ? error.message : String(error);
      return res.status(400).json({ error: errMsg });
    }
  }

  async getCultivatesByFarmId(req: Request, res: Response) {
    try {
      const { farmId } = req.params;
      const cultivates = await this.farmService.findCultivatesByFarmId(Number(farmId));
      return res.status(200).json(cultivates);
    } catch (error) {
      const errMsg = error instanceof Error ? error.message : String(error);
      return res.status(400).json({ error: errMsg });
    }
  }
}