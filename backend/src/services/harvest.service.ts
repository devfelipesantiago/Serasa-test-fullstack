import { IHarvestRepository } from '../model/repositories/interfaces/harvest-repository.interface';
import { Harvest } from '../model/entities/harvest.entity';
import { CultivateService } from './cultivate.service';
import { Farm } from '../model/entities/farm.entity';
import { ApiResponse } from '../utils/responseHandler';

export class HarvestService {
  constructor(
    private repo: IHarvestRepository,
    private cultivateService: CultivateService
  ) { }

  async createHarvest(data: Partial<Harvest>): Promise<ApiResponse<Harvest>> {
    const harvest = await this.repo.create(data);
    return {
      success: true,
      data: harvest,
      message: 'Harvest created successfully'
    };
  }

  async findAll(): Promise<ApiResponse<Harvest[]>> {
    const harvests = await this.repo.findAll();
    return {
      success: true,
      data: harvests,
      message: 'Harvests retrieved successfully'
    };
  }

  async findById(id: number): Promise<ApiResponse<Harvest | null>> {
    const harvest = await this.repo.findById(id);
    if (!harvest) {
      return {
        success: true,
        data: null,
        message: 'Harvest not found'
      };
    }
    return {
      success: true,
      data: harvest,
      message: 'Harvest retrieved successfully'
    };
  }

  async update(id: number, data: Partial<Harvest>): Promise<ApiResponse<Harvest | null>> {
    const harvest = await this.repo.update(id, data);
    if (!harvest) {
      return {
        success: true,
        data: null,
        message: 'Harvest not found'
      };
    }
    return {
      success: true,
      data: harvest,
      message: 'Harvest updated successfully'
    };
  }

  async delete(id: number): Promise<ApiResponse<null>> {
    await this.repo.delete(id);
    return {
      success: true,
      data: null,
      message: 'Harvest deleted successfully'
    };
  }

  async listByFarmId(farmId: number): Promise<Harvest[]> {
    return this.repo.listByFarmId(farmId);
  }

  async listByFarmIds(farmIds: number[]): Promise<Harvest[]> {
    return this.repo.listByFarmIds(farmIds);
  }

  async findFarmByHarvestId(harvestId: number): Promise<ApiResponse<Farm | null>> {
    const harvest = await this.repo.findById(harvestId, ['farm']);
    if (!harvest || !harvest.farm) {
      return {
        success: true,
        data: null,
        message: 'Farm not found for this harvest'
      };
    }
    return {
      success: true,
      data: harvest.farm,
      message: 'Farm retrieved successfully'
    };
  }

  async findCultivatesByHarvestId(harvestId: number): Promise<ApiResponse<any[]>> {
    const cultivates = await this.cultivateService.listByHarvestIds([harvestId]);
    if (cultivates.length === 0) {
      return {
        success: true,
        data: [],
        message: 'No cultivates found for this harvest'
      };
    }
    return {
      success: true,
      data: cultivates,
      message: 'Cultivates retrieved successfully'
    };
  }
}