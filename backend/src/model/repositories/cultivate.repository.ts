import { ICultivateRepository } from './interfaces/cultivate-repository.interface';
import { Cultivate } from '../entities/cultivate.entity';
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
    const cultivate = await this.findById(id);
    if (!cultivate) return null;
    const updatedCultivate = this.repo.merge(cultivate, data);
    return this.repo.save(updatedCultivate);
  }
  async delete(id: number): Promise<void> {
    await this.repo.delete(id);
  }

  async listByHarvestId(harvestId: number): Promise<Cultivate[]> {
    return this.repo.find({ where: { harvest: { id: harvestId } } });
  }

  async listByHarvestIds(harvestIds: number[]): Promise<Cultivate[]> {
    return this.repo.find({
      where: { harvest: { id: In(harvestIds) } },
    });
  }

  async listByFarmId(farmId: number): Promise<Cultivate[]> {
    return this.repo.find({
      where: { harvest: { farm: { id: farmId } } },
      relations: ['harvest'],
    });
  }

  async listByIdHarvestAndFarm(id: number, relations?: string[]): Promise<Cultivate | null> {
    if (relations) {
      return this.repo.findOne({ where: { id }, relations });
    }
    return this.repo.findOneBy({ id })
  }
} 