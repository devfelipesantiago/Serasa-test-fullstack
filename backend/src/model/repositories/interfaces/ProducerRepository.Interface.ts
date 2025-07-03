import { Producer } from '../../entities/Producer.entity';

export interface IProducerRepository {
  create(data: Partial<Producer>): Promise<Producer>;
  findAll(): Promise<Producer[]>;
  findById(id: number): Promise<Producer | null>;
  update(id: number, data: Partial<Producer>): Promise<Producer | null>;
  delete(id: number): Promise<void>;
  findByDocument(document: string): Promise<Producer | null>;
  findWithFarms(id: number): Promise<Producer | null>;
} 