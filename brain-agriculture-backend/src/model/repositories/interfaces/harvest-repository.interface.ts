import { Harvest } from '../../entities/harvest.entity';

export interface IHarvestRepository {
  create(data: Partial<Harvest>): Promise<Harvest>;
  findAll(): Promise<Harvest[]>;
  findById(id: number, relations?: string[]): Promise<Harvest | null>;
  update(id: number, data: Partial<Harvest>): Promise<Harvest | null>;
  delete(id: number): Promise<void>;
  listByFarmId(farmId: number): Promise<Harvest[]>;
  listByFarmIds(farmId: number[]): Promise<Harvest[]>;
} 