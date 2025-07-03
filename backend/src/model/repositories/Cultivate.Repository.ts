import { ICultivateRepository } from './interfaces/CultivateRepository.Interface';
import { Cultivate } from '../entities/Cultivate.entity';
import { AppDataSource } from '../database/config';
import { In } from 'typeorm';

export class CultivateRepository implements ICultivateRepository {
  private repo = AppDataSource.getRepository(Cultivate);

  async create(data: Partial<Cultivate>): Promise<Cultivate> {
    const cultivate = this.repo.create(data);
    return this.repo.save(cultivate);
  }
  async findAll(): Promise<Cultivate[]> {
    return this.repo.find();
  }
  async findById(id: number): Promise<Cultivate | null> {
    return this.repo.findOneBy({ id });
  }
  async update(id: number, data: Partial<Cultivate>): Promise<Cultivate | null> {
    await this.repo.update(id, data);
    return this.findById(id);
  }
  async delete(id: number): Promise<void> {
    await this.repo.delete(id);
  }

  async listByHarvestId(harvestId: number): Promise<Cultivate[]> {
    return this.repo.find({ where: { harvest: { id: harvestId } } });
  }

  listByHarvestIds(harvestIds: number[]): Promise<Cultivate[]> {
    return this.repo.find({
      where: { harvest_id: In(harvestIds) },
    });
  }

  async listByFarmId(farmId: number): Promise<Cultivate[]> {
    return this.repo.find({
      where: { harvest: { farm_id: farmId } },
      relations: ['harvest'],
    });
  }
} 