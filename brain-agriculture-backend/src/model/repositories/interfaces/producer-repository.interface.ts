import { Producer } from '../../entities/producer.entity';

export interface IProducerRepository {
  create(data: Partial<Producer>): Promise<Producer>;
  findAll(options: { skip: number; take: number }): Promise<[Producer[], number]>;
  findById(id: number, relations?: string[]): Promise<Producer | null>;
  update(id: number, data: Partial<Producer>): Promise<Producer | null>;
  delete(id: number): Promise<void>;
  findByDocument(document: string): Promise<Producer | null>;
} 