import { Router } from 'express';
import { HarvestController } from '../controllers/harvest.controller';
import { HarvestService } from '../services/harvest.service';
import { CultivateService } from '../services/cultivate.service';
import { HarvestRepository } from '../model/repositories/harvest.repository';

export const harvestRouter = (cultivateService: CultivateService) => {
  const router = Router();
  const harvestRepository = new HarvestRepository();
  const harvestService = new HarvestService(harvestRepository, cultivateService);
  const harvestController = new HarvestController(harvestService);

  router.post('/', (req, res) => { harvestController.create(req, res); });
  router.get('/', (req, res) => { harvestController.findAll(req, res); });
  router.get('/:id', (req, res) => { harvestController.findById(req, res); });
  router.put('/:id', (req, res) => { harvestController.update(req, res); });
  router.delete('/:id', (req, res) => { harvestController.delete(req, res); });
  router.get('/:id/farm', (req, res) => { harvestController.getFarmByHarvestId(req, res); });
  router.get('/:id/cultivates', (req, res) => { harvestController.getCultivatesByHarvestId(req, res); });

  return router;
}; 