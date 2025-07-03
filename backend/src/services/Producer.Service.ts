import { IProducerRepository } from '../model/repositories/interfaces/ProducerRepository.Interface';
import { IHarvestRepository } from '../model/repositories/interfaces/HarvestRepository.Interface';
import { ICultivateRepository } from '../model/repositories/interfaces/CultivateRepository.Interface';
import { Producer } from '../model/entities/Producer.entity';
import { isValidCnpj, isValidCpf } from '../utils/validDocument.Utils';

export class ProducerService {
  constructor(
    private repo: IProducerRepository,
    private harvestRepo: IHarvestRepository,
    private cultivateRepo: ICultivateRepository
  ) {}

  async createProducer(data: Partial<Producer>): Promise<Producer> {
    const { document, name } = data;
    if (!document) {
      throw new Error('Document is required.');
    }
    const newDocument = document.replace(/\D/g, '');
    if (!(isValidCpf(newDocument) || isValidCnpj(newDocument))) {
      throw new Error('Document is invalid.');
    }
    const existing = await this.repo.findByDocument(document);
    if (existing) {
      throw new Error('Producer already exists!');
    }
    return this.repo.create(data);
  }

  async findAll(): Promise<Producer[]> {
    return this.repo.findAll();
  }

  async findById(id: number): Promise<Producer | null> {
    return this.repo.findById(id);
  }

  async update(id: number, data: Partial<Producer>): Promise<Producer | null> {
    return this.repo.update(id, data);
  }

  async delete(id: number): Promise<void> {
    return this.repo.delete(id);
  }

  async findByDocument(document: string): Promise<Producer | null> {
    return this.repo.findByDocument(document);
  }

  async findWithFarms(id: number): Promise<Producer | null> {
    return this.repo.findWithFarms(id);
  }

  async findFarmsByProducerId(producerId: number) {
    return this.repo.findWithFarms(producerId);
  }

  async findHarvestsByProducerId(producerId: number) {
    const producer = await this.repo.findWithFarms(producerId);
    const farmIds = producer?.farms?.map(farm => farm.id) ?? [];

    if (farmIds.length === 0) return [];
    
    return this.harvestRepo.listByFarmId(farmIds);
  }

  async findCultivatesByProducerId(producerId: number) {
    const producer = await this.repo.findWithFarms(producerId);
    const farmIds = producer?.farms?.map(farm => farm.id) ?? [];

    if (farmIds.length === 0) return [];

    const harvests = await this.harvestRepo.listByFarmId(farmIds);
    const harvestIds = harvests.map(h => h.id);

    if (harvestIds?.length === 0) return [];

    return this.cultivateRepo.listByHarvestIds(harvestIds);
  }
}
