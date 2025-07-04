import { Request, Response } from 'express';
import { ProducerService } from "../services/producer.service";

export class ProducerController {
  constructor(private producerService: ProducerService) { }

  async create(req: Request, res: Response) {
    const result = await this.producerService.createProducer(req.body);
    return res.status(201).json(result);
  }

  async findAll(req: Request, res: Response) {
    const result = await this.producerService.findAll();
    return res.status(200).json(result);
  }

  async findById(req: Request, res: Response) {
    const result = await this.producerService.findById(Number(req.params.id));
    return res.status(200).json(result);
  }

  async update(req: Request, res: Response) {
    const result = await this.producerService.update(Number(req.params.id), req.body);
    return res.status(200).json(result);
  }

  async delete(req: Request, res: Response) {
    const result = await this.producerService.delete(Number(req.params.id));
    return res.status(200).json(result);
  }

  async getFarmsByProducerId(req: Request, res: Response) {
    const result = await this.producerService.findFarmsByProducerId(Number(req.params.id));
    return res.status(200).json(result);
  }

  async getHarvestsByProducerId(req: Request, res: Response) {
    const result = await this.producerService.findHarvestsByProducerId(Number(req.params.id));
    return res.status(200).json(result);
  }

  async getCultivatesByProducerId(req: Request, res: Response) {
    const result = await this.producerService.findCultivatesByProducerId(Number(req.params.id));
    return res.status(200).json(result);
  }

  async findByDocument(req: Request, res: Response) {
    const result = await this.producerService.findByDocument(req.params.document);
    return res.status(200).json(result);
  }
}