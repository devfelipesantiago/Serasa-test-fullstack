import { Router } from 'express';
import { producerRouter } from './producer.routes';
import { farmRouter } from './farm.routes';
import { harvestRouter } from './harvest.routes';
import { cultivateRouter } from './cultivate.routes';
import { userRouter } from './user.routes';

import { FarmRepository } from '../model/repositories/farm.repository';
import { HarvestRepository } from '../model/repositories/harvest.repository';
import { CultivateRepository } from '../model/repositories/cultivate.repository';

import { FarmService } from '../services/farm.service';
import { HarvestService } from '../services/harvest.service';
import { CultivateService } from '../services/cultivate.service';

export const mainRouter = () => {
  const router = Router();

  const cultivateRepository = new CultivateRepository();
  const harvestRepository = new HarvestRepository();
  const farmRepository = new FarmRepository();

  const cultivateService = new CultivateService(cultivateRepository);
  const harvestService = new HarvestService(harvestRepository, cultivateService);
  const farmService = new FarmService(farmRepository, harvestService, cultivateService);

  router.use('/producers', producerRouter(farmService, harvestService, cultivateService));
  router.use('/farms', farmRouter(harvestService, cultivateService));
  router.use('/harvests', harvestRouter(cultivateService));
  router.use('/cultivates', cultivateRouter());
  router.use('/users', userRouter());

  return router;
}