import { Router } from 'express';
import { ProducerController } from '../controllers/Producer.Controller';
import { ProducerService } from '../services/Producer.Service';
import { FarmController } from '../controllers/Farm.Controller';
import { FarmService } from '../services/Farm.Service';
import { HarvestController } from '../controllers/Harvest.Controller';
import { HarvestService } from '../services/Harvest.Service';
import { CultivateController } from '../controllers/Cultivate.Controller';
import { CultivateService } from '../services/Cultivate.Service';
import { ProducerRepository } from '../model/repositories/Producer.Repository';
import { FarmRepository } from '../model/repositories/Farm.Repository';
import { HarvestRepository } from '../model/repositories/Harvest.Repository';
import { CultivateRepository } from '../model/repositories/Cultivate.Repository';

const router = Router();

const producerRepository = new ProducerRepository();
const farmRepository = new FarmRepository();
const harvestRepository = new HarvestRepository();
const cultivateRepository = new CultivateRepository();

const producerService = new ProducerService(producerRepository, harvestRepository, cultivateRepository);
const farmService = new FarmService(farmRepository, harvestRepository, cultivateRepository);
const harvestService = new HarvestService(harvestRepository, cultivateRepository);
const cultivateService = new CultivateService(cultivateRepository);

const producerController = new ProducerController(producerService);
const farmController = new FarmController(farmService);
const harvestController = new HarvestController(harvestService);
const cultivateController = new CultivateController(cultivateService);

router.post('/producers', (req, res) => { producerController.create(req, res); });
router.get('/producers', (req, res) => { producerController.findAll(req, res); });
router.get('/producers/:id', (req, res) => { producerController.findById(req, res); });
router.put('/producers/:id', (req, res) => { producerController.update(req, res); });
router.delete('/producers/:id', (req, res) => { producerController.delete(req, res); });
router.get('/producers/:producerId/farms', (req, res) => { producerController.getFarmsByProducerId(req, res); });
router.get('/producers/:producerId/harvests', (req, res) => { producerController.getHarvestsByProducerId(req, res); });
router.get('/producers/:producerId/cultivates', (req, res) => { producerController.getCultivatesByProducerId(req, res); });

router.post('/farms', (req, res) => { farmController.create(req, res); });
router.get('/farms', (req, res) => { farmController.findAll(req, res); });
router.get('/farms/:id', (req, res) => { farmController.findById(req, res); });
router.put('/farms/:id', (req, res) => { farmController.update(req, res); });
router.delete('/farms/:id', (req, res) => { farmController.delete(req, res); });
router.get('/farms/:farmId/harvests', (req, res) => { farmController.getHarvestsByFarmId(req, res); });
router.get('/farms/:farmId/cultivates', (req, res) => { farmController.getCultivatesByFarmId(req, res); });

router.post('/harvests', (req, res) => { harvestController.create(req, res); });
router.get('/harvests', (req, res) => { harvestController.findAll(req, res); });
router.get('/harvests/:id', (req, res) => { harvestController.findById(req, res); });
router.put('/harvests/:id', (req, res) => { harvestController.update(req, res); });
router.delete('/harvests/:id', (req, res) => { harvestController.delete(req, res); });
router.get('/harvests/:harvestId/cultivates', (req, res) => { cultivateController.getCultivateByHarvestId(req, res); });
router.get('/harvests/:harvestId/cultivates/farms', (req, res) => { harvestController.getHaverstWithCultivatesAndFarmsById(req, res); });

router.post('/cultivates', (req, res) => { cultivateController.create(req, res); });
router.get('/cultivates', (req, res) => { cultivateController.findAll(req, res); });
router.get('/cultivates/:id', (req, res) => { cultivateController.findById(req, res); });
router.put('/cultivates/:id', (req, res) => { cultivateController.update(req, res); });
router.delete('/cultivates/:id', (req, res) => { cultivateController.delete(req, res); });

export default router;
