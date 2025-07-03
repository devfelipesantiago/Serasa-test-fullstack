import { IProducerRepository } from './interfaces/ProducerRepository.Interface';
import { Producer } from '../entities/Producer.entity';
import { AppDataSource } from '../database/config';

export class ProducerRepository implements IProducerRepository {
  private repo = AppDataSource.getRepository(Producer);

  async create(data: Partial<Producer>): Promise<Producer> {
    const producer = this.repo.create(data);
    return this.repo.save(producer);
  }
  async findAll(): Promise<Producer[]> {
    return this.repo.find();
  }
  async findById(id: number): Promise<Producer | null> {
    return this.repo.findOneBy({ id });
  }
  async update(id: number, data: Partial<Producer>): Promise<Producer | null> {
    await this.repo.update(id, data);
    return this.findById(id);
  }
  async delete(id: number): Promise<void> {
    await this.repo.delete(id);
  }
  async findByDocument(document: string): Promise<Producer | null> {
    return this.repo.findOneBy({ document });
  }
  async findByIdWithFarms(id: number): Promise<Producer | null> {
    return this.repo.findOne({ where: { id }, relations: ['farms'] });
  }
} 