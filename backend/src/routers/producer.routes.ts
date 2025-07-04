import { Router } from 'express';
import { ProducerController } from '../controllers/producer.controller';
import { ProducerService } from '../services/producer.service';
import { FarmService } from '../services/farm.service';
import { HarvestService } from '../services/harvest.service';
import { CultivateService } from '../services/cultivate.service';
import { ProducerRepository } from '../model/repositories/producer.repository';
import { validateDto } from '../middlewares/validateDto.middleware';
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

  router.post('/', validateDto(CreateProducerDto), (req, res) => { producerController.create(req, res); });
  router.get('/', (req, res) => { producerController.findAll(req, res); });
  router.get('/:id', (req, res) => { producerController.findById(req, res); });
  router.put('/:id', validateDto(UpdateProducerDto), (req, res) => { producerController.update(req, res); });
  router.delete('/:id', (req, res) => { producerController.delete(req, res); });

  router.get('/:id/farms', (req, res) => { producerController.getFarmsByProducerId(req, res); });
  router.get('/:id/harvests', (req, res) => { producerController.getHarvestsByProducerId(req, res); });
  router.get('/:id/cultivates', (req, res) => { producerController.getCultivatesByProducerId(req, res); });
  router.get('/document/:document', (req, res) => { producerController.findByDocument(req, res); });

  return router;
};