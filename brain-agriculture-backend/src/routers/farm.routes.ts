import { Router, Request, Response } from 'express';
import { FarmController } from '../controllers/farm.controller';
import { FarmService } from '../services/farm.service';
import { HarvestService } from '../services/harvest.service';
import { CultivateService } from '../services/cultivate.service';
import { FarmRepository } from '../model/repositories/farm.repository';
import { validateDto } from '../middlewares/validateDto.middleware';
import { asyncHandler } from '../middlewares/asyncHandler.middleware';
import { CreateFarmDto, UpdateFarmDto } from '../dtos';

export const farmRouter = (harvestService: HarvestService, cultivateService: CultivateService) => {
  const router = Router();
  const farmRepository = new FarmRepository();
  const farmService = new FarmService(farmRepository, harvestService, cultivateService);
  const farmController = new FarmController(farmService);

  router.post('/', validateDto(CreateFarmDto), asyncHandler((req: Request, res: Response) => farmController.create(req, res)));
  router.get('/', asyncHandler((req: Request, res: Response) => farmController.findAll(req, res)));
  router.get('/:id', asyncHandler((req: Request, res: Response) => farmController.findById(req, res)));
  router.put('/:id', validateDto(UpdateFarmDto), asyncHandler((req: Request, res: Response) => farmController.update(req, res)));
  router.delete('/:id', asyncHandler((req: Request, res: Response) => farmController.delete(req, res)));
  router.get('/:id/producer', asyncHandler((req: Request, res: Response) => farmController.getProducerByFarmId(req, res)));
  router.get('/:id/harvests', asyncHandler((req: Request, res: Response) => farmController.getHarvestsByFarmId(req, res)));
  router.get('/:id/cultivates', asyncHandler((req: Request, res: Response) => farmController.getCultivatesByFarmId(req, res)));
  router.get('/state/:state', asyncHandler((req: Request, res: Response) => farmController.findByState(req, res)));

  return router;
};