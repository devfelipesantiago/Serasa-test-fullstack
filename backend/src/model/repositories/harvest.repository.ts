import { IHarvestRepository } from './interfaces/harvest-repository.interface';
import { Harvest } from '../entities/harvest.entity';
import { AppDataSource } from '../database/config';
import { In } from 'typeorm';

export class HarvestRepository implements IHarvestRepository {
  private repo = AppDataSource.getRepository(Harvest);

  async create(data: Partial<Harvest>): Promise<Harvest> {
    const harvest = this.repo.create(data);
    return this.repo.save(harvest);
  }
  async findAll(): Promise<Harvest[]> {
    return this.repo.find();
  }
  async findById(id: number, relations?: string[]): Promise<Harvest | null> {
    if (relations) {
      return this.repo.findOne({ where: { id }, relations });
    }
    return this.repo.findOneBy({ id });
  }
  async update(id: number, data: Partial<Harvest>): Promise<Harvest | null> {
    const harvest = await this.findById(id);
    if (!harvest) return null;
    const updatedHarvest = this.repo.merge(harvest, data);
    return this.repo.save(updatedHarvest);
  }
  async delete(id: number): Promise<void> {
    await this.repo.delete(id);
  }
  async listByFarmId(farmId: number): Promise<Harvest[]> {
    return this.repo.find({ where: { farm: { id: farmId } } });
  }
  async listByFarmIds(farmIds: number[]): Promise<Harvest[]> {
    if (farmIds.length === 0) return [];
    return this.repo.find({where: { farm: { id: In(farmIds) } } });
  }
} 