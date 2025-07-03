import { IFarmRepository } from '../model/repositories/interfaces/FarmRepository.Interface';
import { IHarvestRepository } from '../model/repositories/interfaces/HarvestRepository.Interface';
import { ICultivateRepository } from '../model/repositories/interfaces/CultivateRepository.Interface';
import { Farm } from '../model/entities/Farm.entity';
import { Cultivate } from '../model/entities/Cultivate.entity';

export class FarmService {
  constructor(
    private repo: IFarmRepository,
    private harvestRepo: IHarvestRepository,
    private cultivateRepo: ICultivateRepository
  ) {}

  async createFarm(data: Partial<Farm>): Promise<Farm> {
    if ((Number(data.arable_area) || 0) + (Number(data.vegetation_area) || 0) > Number(data.total_area)) {
      throw new Error('A soma das áreas não pode exceder a área total.');
    }
    return this.repo.create(data);
  }

  async findAll(): Promise<Farm[]> {
    return this.repo.findAll();
  }

  async findById(id: number): Promise<Farm | null> {
    const farm = this.repo.findById(id);
    if (!farm) throw new Error('Not found');
    return farm;
  }

  async update(id: number, data: Partial<Farm>): Promise<Farm | null> {
    return this.repo.update(id, data);
  }

  async delete(id: number): Promise<void> {
    return this.repo.delete(id);
  }

  async findByState(state: string): Promise<Farm[]> {
    return this.repo.findByState(state);
  }

  async listByProducerId(producerId: number): Promise<Farm[]> {
    return this.repo.listByProducerId(producerId);
  }

  async findWithRelations(id: number): Promise<Farm | null> {
    return this.repo.findWithRelations(id);
  }

  async findHarvestsByFarmId(farmId: number) {
    return this.harvestRepo.listByFarmId(farmId);
  }

  async findCultivatesByFarmId(farmId: number) {
    const harvests = await this.harvestRepo.listByFarmId(farmId);
    const harvestIds = harvests.map(harvest => harvest.id);
    if (!harvestIds.length) return [];
    return this.cultivateRepo.listByHarvestIds(harvestIds);
  }
}