import { Cultivate } from '../../entities/Cultivate.entity';

export interface ICultivateRepository {
  create(data: Partial<Cultivate>): Promise<Cultivate>;
  findAll(): Promise<Cultivate[]>;
  findById(id: number): Promise<Cultivate | null>;
  update(id: number, data: Partial<Cultivate>): Promise<Cultivate | null>;
  delete(id: number): Promise<void>;
  listByHarvestIds(harvestIds: number[]): Promise<Cultivate[]>;
  listByFarmIds(farmIds: number[]): Promise<Cultivate[]>;
} 