import { IProducerRepository } from './interfaces/producer-repository.interface';
import { Producer } from '../entities/producer.entity';
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
  async findById(id: number, relations?: string[]): Promise<Producer | null> {
    if (relations) {
      return this.repo.findOne({ where: { id }, relations });
    }
    return this.repo.findOneBy({ id });
  }
  async update(id: number, data: Partial<Producer>): Promise<Producer | null> {
    const producer = await this.findById(id);
    if (!producer) return null;
    const updatedProducer = this.repo.merge(producer, data);
    return this.repo.save(updatedProducer);
  }
  async delete(id: number): Promise<void> {
    await this.repo.delete(id);
  }
  async findByDocument(document: string): Promise<Producer | null> {
    return this.repo.findOneBy({ document });
  }
} 