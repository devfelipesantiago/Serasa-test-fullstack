import { IFarmRepository } from './interfaces/FarmRepository.Interface';
import { Farm } from '../entities/Farm.entity';
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
  async findById(id: number): Promise<Farm | null> {
    return this.repo.findOneBy({ id });
  }
  async update(id: number, data: Partial<Farm>): Promise<Farm | null> {
    await this.repo.update(id, data);
    return this.findById(id);
  }
  async delete(id: number): Promise<void> {
    await this.repo.delete(id);
  }
  async findByState(state: string): Promise<Farm[]> {
    return this.repo.find({ where: { state } });
  }
  async listByProducerId(producerId: number): Promise<Farm[]> {
    return this.repo.find({ where: { producer_id: producerId } });
  }
  async findByIdWithHarvestsAndProducer(id: number): Promise<Farm | null> {
    return this.repo.findOne({ where: { id }, relations: ['harvests', 'producer'] });
  }
} 