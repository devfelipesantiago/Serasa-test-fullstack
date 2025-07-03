import { Request, Response } from 'express';
import { HarvestService } from "../services/Harvest.Service";

export class HarvestController {
  private harvestService: HarvestService;

  constructor(harvestService: HarvestService) {
    this.harvestService = harvestService;
  }

  async create(req: Request, res: Response) {
    try {
      const harvest = await this.harvestService.createHarvest(req.body);
      return res.status(201).json(harvest);
    } catch (error) {
      const errMsg = error instanceof Error ? error.message : String(error);
      return res.status(400).json({ error: errMsg });
    }
  }

  async findAll(req: Request, res: Response) {
    try {
      const harvests = await this.harvestService.findAll();
      return res.json(harvests);
    } catch (error) {
      const errMsg = error instanceof Error ? error.message : String(error);
      return res.status(500).json({ error: errMsg });
    }
  }

  async findById(req: Request, res: Response) {
    try {
      const harvest = await this.harvestService.findById(Number(req.params.id));
      if (!harvest) return res.status(404).json({ error: 'Not found' });
      return res.json(harvest);
    } catch (error) {
      const errMsg = error instanceof Error ? error.message : String(error);
      return res.status(500).json({ error: errMsg });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const harvest = await this.harvestService.update(Number(req.params.id), req.body);
      return res.json(harvest);
    } catch (error) {
      const errMsg = error instanceof Error ? error.message : String(error);
      return res.status(400).json({ error: errMsg });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      await this.harvestService.delete(Number(req.params.id));
      return res.status(204).send();
    } catch (error) {
      const errMsg = error instanceof Error ? error.message : String(error);
      return res.status(400).json({ error: errMsg });
    }
  }

  async getCultivatesByHarvestId(req: Request, res: Response) {
    try {
      const { harvestId } = req.params;
      const cultivates = await this.harvestService.findCultivatesByHarvestId(Number(harvestId));
      return res.status(200).json(cultivates);
    } catch (error) {
      const errMsg = error instanceof Error ? error.message : String(error);
      return res.status(400).json({ error: errMsg });
    }
  }
}