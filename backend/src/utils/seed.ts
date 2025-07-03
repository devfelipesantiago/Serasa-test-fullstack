import { AppDataSource } from '../model/database/config';
import { Producer } from '../model/entities/Producer.entity';
import { Farm } from '../model/entities/Farm.entity';
import { Harvest } from '../model/entities/Harvest.entity';
import { Cultivate } from '../model/entities/Cultivate.entity';

async function seed() {
  await AppDataSource.initialize();

  const producerRepo = AppDataSource.getRepository(Producer);
  const producer1 = producerRepo.create({ name: 'João Silva', document: '12345678900' });
  const producer2 = producerRepo.create({ name: 'Maria Souza', document: '98765432100' });
  await producerRepo.save([producer1, producer2]);

  const farmRepo = AppDataSource.getRepository(Farm);
  const farm1 = farmRepo.create({
    name: 'Fazenda Primavera',
    city: 'Uberlândia',
    state: 'MG',
    total_area: 100,
    arable_area: 60,
    vegetation_area: 40,
    producer: producer1
  });
  const farm2 = farmRepo.create({
    name: 'Fazenda Sol Nascente',
    city: 'Ribeirão Preto',
    state: 'SP',
    total_area: 200,
    arable_area: 120,
    vegetation_area: 80,
    producer: producer2
  });
  await farmRepo.save([farm1, farm2]);

  const harvestRepo = AppDataSource.getRepository(Harvest);
  const harvest1 = harvestRepo.create({ year: 2022, farm: farm1 });
  const harvest2 = harvestRepo.create({ year: 2023, farm: farm1 });
  const harvest3 = harvestRepo.create({ year: 2022, farm: farm2 });
  await harvestRepo.save([harvest1, harvest2, harvest3]);

  const cultivateRepo = AppDataSource.getRepository(Cultivate);
  const cultivate1 = cultivateRepo.create({ name: 'Soja', harvest: harvest1 });
  const cultivate2 = cultivateRepo.create({ name: 'Milho', harvest: harvest1 });
  const cultivate3 = cultivateRepo.create({ name: 'Cana', harvest: harvest2 });
  const cultivate4 = cultivateRepo.create({ name: 'Algodão', harvest: harvest3 });
  await cultivateRepo.save([cultivate1, cultivate2, cultivate3, cultivate4]);

  console.log('Seed concluído com sucesso!');
  process.exit(0);
}

seed().catch(e => {
  console.error('Erro ao rodar seed:', e);
  process.exit(1);
}); 