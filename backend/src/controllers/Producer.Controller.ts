import { Request, Response } from 'express';
import { ProducerService } from "../services/Producer.Service";

export class ProducerController {
  private producerService: ProducerService;

  constructor(producerService: ProducerService) {
    this.producerService = producerService;
  }

  async create(req: Request, res: Response) {
    const producer = await this.producerService.createProducer(req.body);
    return res.status(201).json(producer);
  }

  async findAll(req: Request, res: Response) {
    const producers = await this.producerService.findAll();
    return res.json(producers);
  }

  async findById(req: Request, res: Response) {
    const producer = await this.producerService.findById(Number(req.params.id));
    return res.json(producer);
  }

  async update(req: Request, res: Response) {
    const producer = await this.producerService.update(Number(req.params.id), req.body);
    return res.json(producer);
  }

  async delete(req: Request, res: Response) {
    await this.producerService.delete(Number(req.params.id));
    return res.status(204).send();
  }

  async getFarmsByProducerId(req: Request, res: Response) {
    const farms = await this.producerService.findFarmsByProducerId(Number(req.params.producerId));
    return res.status(200).json(farms);
  }

  async getHarvestsByProducerId(req: Request, res: Response) {
    const harvests = await this.producerService.findHarvestsByProducerId(Number(req.params.producerId));
    return res.status(200).json(harvests);
  }

  async getCultivatesByProducerId(req: Request, res: Response) {
    const cultivates = await this.producerService.findCultivatesByProducerId(Number(req.params.producerId));
    return res.status(200).json(cultivates);
  }
}