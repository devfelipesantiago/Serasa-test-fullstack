import { Harvest } from '../../entities/Harvest.entity';

export interface IHarvestRepository {
  create(data: Partial<Harvest>): Promise<Harvest>;
  findAll(): Promise<Harvest[]>;
  findById(id: number): Promise<Harvest | null>;
  update(id: number, data: Partial<Harvest>): Promise<Harvest | null>;
  delete(id: number): Promise<void>;
  listByFarmId(farmId: number): Promise<Harvest[]>;
  findWithCultivates(id: number): Promise<Harvest | null>
  findByIdWithFarmAndCultivates(id: number): Promise<Harvest | null>;
} 