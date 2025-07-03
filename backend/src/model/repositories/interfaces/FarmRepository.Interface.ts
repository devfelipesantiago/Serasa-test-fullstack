import { Farm } from '../../entities/Farm.entity';

export interface IFarmRepository {
  create(data: Partial<Farm>): Promise<Farm>;
  findAll(): Promise<Farm[]>;
  findById(id: number): Promise<Farm | null>;
  update(id: number, data: Partial<Farm>): Promise<Farm | null>;
  delete(id: number): Promise<void>;
  findByState(state: string): Promise<Farm[]>;
  listByProducerId(producerId: number): Promise<Farm[]>;
  findByIdWithHarvestsAndProducer(id: number): Promise<Farm | null>;
} 