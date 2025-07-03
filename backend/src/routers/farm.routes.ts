import { Router } from 'express';
import { FarmController } from '../controllers/farm.controller';
import { FarmService } from '../services/farm.service';
import { HarvestService } from '../services/harvest.service';
import { CultivateService } from '../services/cultivate.service';
import { FarmRepository } from '../model/repositories/farm.repository';

export const farmRouter = (harvestService: HarvestService, cultivateService: CultivateService) => {
  const router = Router();
  const farmRepository = new FarmRepository();
  const farmService = new FarmService(farmRepository, harvestService, cultivateService);
  const farmController = new FarmController(farmService);

  router.post('/', (req, res) => { farmController.create(req, res); });
  router.get('/', (req, res) => { farmController.findAll(req, res); });
  router.get('/:id', (req, res) => { farmController.findById(req, res); });
  router.put('/:id', (req, res) => { farmController.update(req, res); });
  router.delete('/:id', (req, res) => { farmController.delete(req, res); });
  router.get('/:id/producer', (req, res) => { farmController.getProducerByFarmId(req, res); });
  router.get('/:id/harvests', (req, res) => { farmController.getHarvestsByFarmId(req, res); });
  router.get('/:id/cultivates', (req, res) => { farmController.getCultivatesByFarmId(req, res); });
  router.get('/state/:state', (req, res) => { farmController.findByState(req, res); });

  return router;
};