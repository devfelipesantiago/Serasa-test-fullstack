import { Router } from 'express';
import { CultivateController } from '../controllers/cultivate.controller';
import { CultivateService } from '../services/cultivate.service';
import { CultivateRepository } from '../model/repositories/cultivate.repository';

export const cultivateRouter = () => {
  const router = Router();
  const cultivateRepository = new CultivateRepository();
  const cultivateService = new CultivateService(cultivateRepository);
  const cultivateController = new CultivateController(cultivateService);

  router.post('/', (req, res) => { cultivateController.create(req, res); });
  router.get('/', (req, res) => { cultivateController.findAll(req, res); });
  router.get('/farm/:farmId', (req, res) => { cultivateController.listByFarmId(req, res); });
  router.get('/:id/harvests', (req, res) => { cultivateController.getByIdHarvestAndFarm(req, res); });
  router.get('/:id', (req, res) => { cultivateController.findById(req, res); });
  router.put('/:id', (req, res) => { cultivateController.update(req, res); });
  router.delete('/:id', (req, res) => { cultivateController.delete(req, res); });


  return router;
}; 