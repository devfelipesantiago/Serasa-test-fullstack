import { IHarvestRepository } from '../model/repositories/interfaces/HarvestRepository.Interface';
import { ICultivateRepository } from '../model/repositories/interfaces/CultivateRepository.Interface';
import { Harvest } from '../model/entities/Harvest.entity';

export class HarvestService {
  constructor(
    private repo: IHarvestRepository,
    private cultivateRepo: ICultivateRepository
  ) {}

  async createHarvest(data: Partial<Harvest>): Promise<Harvest> {
    return this.repo.create(data);
  }

  async findAll(): Promise<Harvest[]> {
    return this.repo.findAll();
  }

  async findById(id: number): Promise<Harvest | null> {
    const harvest = this.repo.findById(id);
    if (!harvest) throw new Error('Not found');
    return harvest;
  }

  async update(id: number, data: Partial<Harvest>): Promise<Harvest | null> {
    return this.repo.update(id, data);
  }

  async delete(id: number): Promise<void> {
    return this.repo.delete(id);
  }

  async listByFarmId(farmId: number): Promise<Harvest[]> {
    return this.repo.listByFarmId(farmId);
  }

  async findWithCultivates(id: number): Promise<Harvest[] | null> {
    return this.repo.findWithCultivates(id);
  }

  async findCultivatesByHarvestId(harvestId: number) {
    return this.cultivateRepo.listByHarvestIds(harvestId);
  }

  async findHaverstWithCultivatesAndFarmsById(harvestId: number) {
    return this.repo.findHaverstWithCultivatesAndFarms(harvestId);
  }
}