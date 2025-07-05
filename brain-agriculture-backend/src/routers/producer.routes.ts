import { Router, Request, Response } from 'express';
import { ProducerController } from '../controllers/producer.controller';
import { ProducerService } from '../services/producer.service';
import { FarmService } from '../services/farm.service';
import { HarvestService } from '../services/harvest.service';
import { CultivateService } from '../services/cultivate.service';
import { ProducerRepository } from '../model/repositories/producer.repository';
import { validateDto } from '../middlewares/validateDto.middleware';
import { asyncHandler } from '../middlewares/asyncHandler.middleware';
import { CreateProducerDto, UpdateProducerDto } from '../dtos';

export const producerRouter = (
  farmService: FarmService,
  harvestService: HarvestService,
  cultivateService: CultivateService
) => {
  const router = Router();
  const producerRepository = new ProducerRepository();
  const producerService = new ProducerService(producerRepository, farmService, harvestService, cultivateService);
  const producerController = new ProducerController(producerService);

  router.get('/dashboard', asyncHandler((req: Request, res: Response) => producerController.getDashboardData(req, res)));
  router.post('/', validateDto(CreateProducerDto), asyncHandler((req: Request, res: Response) => producerController.create(req, res)));
  router.get('/', asyncHandler((req: Request, res: Response) => producerController.findAll(req, res)));
  router.get('/:id', asyncHandler((req: Request, res: Response) => producerController.findById(req, res)));
  router.put('/:id', validateDto(UpdateProducerDto), asyncHandler((req: Request, res: Response) => producerController.update(req, res)));
  router.delete('/:id', asyncHandler((req: Request, res: Response) => producerController.delete(req, res)));

  router.get('/:id/farms', asyncHandler((req: Request, res: Response) => producerController.getFarmsByProducerId(req, res)));
  router.get('/:id/harvests', asyncHandler((req: Request, res: Response) => producerController.getHarvestsByProducerId(req, res)));
  router.get('/:id/cultivates', asyncHandler((req: Request, res: Response) => producerController.getCultivatesByProducerId(req, res)));
  router.get('/document/:document', asyncHandler((req: Request, res: Response) => producerController.findByDocument(req, res)));

  return router;
};