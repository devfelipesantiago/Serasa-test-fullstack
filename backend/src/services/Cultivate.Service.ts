import { ICultivateRepository } from '../model/repositories/interfaces/CultivateRepository.Interface';
import { Cultivate } from '../model/entities/Cultivate.entity';
    
export class CultivateService {
  constructor(private repo: ICultivateRepository) {}

  async createCultivate(data: Partial<Cultivate>): Promise<Cultivate> {
    return this.repo.create(data);
  }

  async findAll(): Promise<Cultivate[]> {
    return this.repo.findAll();
  }

  async findById(id: number): Promise<Cultivate | null> {
    return this.repo.findById(id);
  }

  async update(id: number, data: Partial<Cultivate>): Promise<Cultivate | null> {
    return this.repo.update(id, data);
  }

  async delete(id: number): Promise<void> {
    return this.repo.delete(id);
  }

  async listByHarvestId(harvestId: number): Promise<Cultivate[]> {
    return this.repo.listByHarvestIds(harvestId);
  }

  async listByFarmId(farmId: number): Promise<Cultivate[]> {
    return this.repo.listByFarmIds(farmId);
  }
}