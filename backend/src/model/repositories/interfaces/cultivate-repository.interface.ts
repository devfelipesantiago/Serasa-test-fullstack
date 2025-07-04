import { Cultivate } from '../../entities/cultivate.entity';

export interface ICultivateRepository {
  create(data: Partial<Cultivate>): Promise<Cultivate>;
  findAll(): Promise<Cultivate[]>;
  findById(id: number): Promise<Cultivate | null>;
  update(id: number, data: Partial<Cultivate>): Promise<Cultivate | null>;
  delete(id: number): Promise<void>;
  listByFarmId(farmId: number): Promise<Cultivate[]>;
  listByHarvestId(harvestId: number): Promise<Cultivate[]>;
  listByHarvestIds(harvestIds: number[]): Promise<Cultivate[]>;
  listByIdHarvestAndFarm(cultivateId: number, relations?: string[]): Promise<Cultivate | null>;
} 