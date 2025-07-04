import { Router, Request, Response } from 'express';
import { HarvestController } from '../controllers/harvest.controller';
import { HarvestService } from '../services/harvest.service';
import { CultivateService } from '../services/cultivate.service';
import { HarvestRepository } from '../model/repositories/harvest.repository';
import { validateDto } from '../middlewares/validateDto.middleware';
import { asyncHandler } from '../middlewares/asyncHandler.middleware';
import { CreateHarvestDto, UpdateHarvestDto } from '../dtos';

export const harvestRouter = (cultivateService: CultivateService) => {
  const router = Router();
  const harvestRepository = new HarvestRepository();
  const harvestService = new HarvestService(harvestRepository, cultivateService);
  const harvestController = new HarvestController(harvestService);

  router.post('/', validateDto(CreateHarvestDto), asyncHandler((req: Request, res: Response) => harvestController.create(req, res)));
  router.get('/', asyncHandler((req: Request, res: Response) => harvestController.findAll(req, res)));
  router.get('/:id', asyncHandler((req: Request, res: Response) => harvestController.findById(req, res)));
  router.put('/:id', validateDto(UpdateHarvestDto), asyncHandler((req: Request, res: Response) => harvestController.update(req, res)));
  router.delete('/:id', asyncHandler((req: Request, res: Response) => harvestController.delete(req, res)));
  router.get('/:id/farm', asyncHandler((req: Request, res: Response) => harvestController.getFarmByHarvestId(req, res)));
  router.get('/:id/cultivates', asyncHandler((req: Request, res: Response) => harvestController.getCultivatesByHarvestId(req, res)));

  return router;
}; 