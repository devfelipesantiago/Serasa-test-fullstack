import { Request, Response } from 'express';
import { ProducerService } from "../services/Producer.Service";

export class ProducerController {
  private producerService: ProducerService;

  constructor(producerService: ProducerService) {
    this.producerService = producerService;
  }

  async create(req: Request, res: Response) {
    try {
      const producer = await this.producerService.createProducer(req.body);
      return res.status(201).json(producer);
    } catch (error) {
      const errMsg = error instanceof Error ? error.message : String(error);
      return res.status(400).json({ error: errMsg });
    }
  }

  async findAll(req: Request, res: Response) {
    try {
      const producers = await this.producerService.findAll();
      return res.json(producers);
    } catch (error) {
      const errMsg = error instanceof Error ? error.message : String(error);
      return res.status(500).json({ error: errMsg });
    }
  }

  async findById(req: Request, res: Response) {
    try {
      const producer = await this.producerService.findById(Number(req.params.id));
      if (!producer) return res.status(404).json({ error: 'Not found' });
      return res.json(producer);
    } catch (error) {
      const errMsg = error instanceof Error ? error.message : String(error);
      return res.status(500).json({ error: errMsg });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const producer = await this.producerService.update(Number(req.params.id), req.body);
      return res.json(producer);
    } catch (error) {
      const errMsg = error instanceof Error ? error.message : String(error);
      return res.status(400).json({ error: errMsg });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      await this.producerService.delete(Number(req.params.id));
      return res.status(204).send();
    } catch (error) {
      const errMsg = error instanceof Error ? error.message : String(error);
      return res.status(400).json({ error: errMsg });
    }
  }

  async getFarmsByProducerId(req: Request, res: Response) {
    try {
      const { producerId } = req.params;
      const farms = await this.producerService.findFarmsByProducerId(Number(producerId));
      return res.status(200).json(farms);
    } catch (error) {
      const errMsg = error instanceof Error ? error.message : String(error);
      return res.status(400).json({ error: errMsg });
    }
  }

  async getHarvestsByProducerId(req: Request, res: Response) {
    try {
      const { producerId } = req.params;
      const harvests = await this.producerService.findHarvestsByProducerId(Number(producerId));
      return res.status(200).json(harvests);
    } catch (error) {
      const errMsg = error instanceof Error ? error.message : String(error);
      return res.status(400).json({ error: errMsg });
    }
  }

  async getCultivatesByProducerId(req: Request, res: Response) {
    try {
      const { producerId } = req.params;
      const cultivates = await this.producerService.findCultivatesByProducerId(Number(producerId));
      return res.status(200).json(cultivates);
    } catch (error) {
      const errMsg = error instanceof Error ? error.message : String(error);
      return res.status(400).json({ error: errMsg });
    }
  }
}