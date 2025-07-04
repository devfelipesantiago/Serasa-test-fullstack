import { Router, Request, Response } from 'express';
import { CultivateController } from '../controllers/cultivate.controller';
import { CultivateService } from '../services/cultivate.service';
import { CultivateRepository } from '../model/repositories/cultivate.repository';
import { validateDto } from '../middlewares/validateDto.middleware';
import { asyncHandler } from '../middlewares/asyncHandler.middleware';
import { CreateCultivateDto, UpdateCultivateDto } from '../dtos';

export const cultivateRouter = () => {
  const router = Router();
  const cultivateRepository = new CultivateRepository();
  const cultivateService = new CultivateService(cultivateRepository);
  const cultivateController = new CultivateController(cultivateService);

  router.post('/', validateDto(CreateCultivateDto), asyncHandler((req: Request, res: Response) => cultivateController.create(req, res)));
  router.get('/', asyncHandler((req: Request, res: Response) => cultivateController.findAll(req, res)));
  router.get('/farm/:farmId', asyncHandler((req: Request, res: Response) => cultivateController.listByFarmId(req, res)));
  router.get('/:id/harvests', asyncHandler((req: Request, res: Response) => cultivateController.getByIdHarvestAndFarm(req, res)));
  router.get('/:id', asyncHandler((req: Request, res: Response) => cultivateController.findById(req, res)));
  router.put('/:id', validateDto(UpdateCultivateDto), asyncHandler((req: Request, res: Response) => cultivateController.update(req, res)));
  router.delete('/:id', asyncHandler((req: Request, res: Response) => cultivateController.delete(req, res)));

  return router;
}; 