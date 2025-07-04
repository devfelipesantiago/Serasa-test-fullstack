import { IFarmRepository } from './interfaces/farm-repository.interface';
import { Farm } from '../entities/farm.entity';
import { AppDataSource } from '../database/config';

export class FarmRepository implements IFarmRepository {
  private repo = AppDataSource.getRepository(Farm);

  async create(data: Partial<Farm>): Promise<Farm> {
    const farm = this.repo.create(data);
    return this.repo.save(farm);
  }
  async findAll(): Promise<Farm[]> {
    return this.repo.find();
  }
  async findById(id: number, relations?: string[]): Promise<Farm | null> {
    if (relations) {
      return this.repo.findOne({ where: { id }, relations });
    }
    return this.repo.findOneBy({ id });
  }
  async update(id: number, data: Partial<Farm>): Promise<Farm | null> {
    const farm = await this.findById(id);
    if (!farm) return null;
    const updatedFarm = this.repo.merge(farm, data);
    return this.repo.save(updatedFarm);
  }
  async delete(id: number): Promise<void> {
    await this.repo.delete(id);
  }
  async findByState(state: string): Promise<Farm[]> {
    return this.repo.find({ where: { state } });
  }
  async listByProducerId(producerId: number): Promise<Farm[]> {
    return this.repo.find({ where: { producer: { id: producerId } } });
  }
} 