import { Request, Response } from 'express';
import { CultivateService } from "../services/Cultivate.Service";

export class CultivateController {
  private cultivateService: CultivateService;

  constructor(cultivateService: CultivateService) {
    this.cultivateService = cultivateService;
  }

  async create(req: Request, res: Response) {
    try {
      const cultivate = await this.cultivateService.createCultivate(req.body);
      return res.status(201).json(cultivate);
    } catch (error) {
      const errMsg = error instanceof Error ? error.message : String(error);
      return res.status(400).json({ error: errMsg });
    }
  }

  async findAll(req: Request, res: Response) {
    try {
      const cultivates = await this.cultivateService.findAll();
      return res.json(cultivates);
    } catch (error) {
      const errMsg = error instanceof Error ? error.message : String(error);
      return res.status(500).json({ error: errMsg });
    }
  }

  async findById(req: Request, res: Response) {
    try {
      const cultivate = await this.cultivateService.findById(Number(req.params.id));
      if (!cultivate) return res.status(404).json({ error: 'Not found' });
      return res.json(cultivate);
    } catch (error) {
      const errMsg = error instanceof Error ? error.message : String(error);
      return res.status(500).json({ error: errMsg });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const cultivate = await this.cultivateService.update(Number(req.params.id), req.body);
      return res.json(cultivate);
    } catch (error) {
      const errMsg = error instanceof Error ? error.message : String(error);
      return res.status(400).json({ error: errMsg });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      await this.cultivateService.delete(Number(req.params.id));
      return res.status(204).send();
    } catch (error) {
      const errMsg = error instanceof Error ? error.message : String(error);
      return res.status(400).json({ error: errMsg });
    }
  }

  async getCultivateByHarvestId(req: Request, res: Response) {
    try {
      const { harvestId } = req.params;
      const cultivates = await this.cultivateService.listByHarvestId(Number(harvestId));
      return res.status(200).json(cultivates);
    } catch (error) {
      const errMsg = error instanceof Error ? error.message : String(error);
      return res.status(400).json({ error: errMsg });
    }
  }
}