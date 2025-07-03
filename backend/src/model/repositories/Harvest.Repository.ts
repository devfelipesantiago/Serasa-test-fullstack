import { IHarvestRepository } from './interfaces/HarvestRepository.Interface';
import { Harvest } from '../entities/Harvest.entity';
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
  async findById(id: number): Promise<Harvest | null> {
    return this.repo.findOneBy({ id });
  }
  async update(id: number, data: Partial<Harvest>): Promise<Harvest | null> {
    await this.repo.update(id, data);
    return this.findById(id);
  }
  async delete(id: number): Promise<void> {
    await this.repo.delete(id);
  }
  async listByFarmId(farmId: number): Promise<Harvest[]> {
    return this.repo.find({ where: { farm_id: farmId } });
  }
  async findWithCultivates(id: number): Promise<Harvest | null> {
    return this.repo.findOne({ where: { id }, relations: ['cultivates'] });
  }
  async findByIdWithFarmAndCultivates(id: number): Promise<Harvest | null> {
    return this.repo.findOne({ where: { id }, relations: ['cultivates', 'farm'] });
  }
} 