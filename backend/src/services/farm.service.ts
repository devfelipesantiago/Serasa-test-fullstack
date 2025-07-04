import { IFarmRepository } from '../model/repositories/interfaces/farm-repository.interface';
import { Farm } from '../model/entities/farm.entity';
import { Cultivate } from '../model/entities/cultivate.entity';
import { Producer } from '../model/entities/producer.entity';
import { CultivateService } from './cultivate.service';
import { HarvestService } from './harvest.service';
import { ApiResponse } from '../utils/responseHandler.utils';

export class FarmService {
  constructor(
    private repo: IFarmRepository,
    private harvestService: HarvestService,
    private cultivateService: CultivateService
  ) { }

  async createFarm(data: Partial<Farm>): Promise<ApiResponse<Farm>> {
    if ((Number(data.arableArea) || 0) + (Number(data.vegetationArea) || 0) > Number(data.totalArea)) {
      throw new Error('The sum of the areas cannot exceed the total area.');
    }
    const farm = await this.repo.create(data);
    return {
      success: true,
      data: farm,
      message: 'Farm created successfully'
    };
  }

  async findAll(page = 1, limit = 20): Promise<ApiResponse<Farm[]>> {
    const offset = (page - 1) * limit;
    const repo = (this.repo as any).repo || this.repo;
    const [farms, total] = await repo.createQueryBuilder('farm')
      .skip(offset)
      .take(limit)
      .getManyAndCount();
    return {
      success: true,
      data: farms,
      message: `Farms retrieved successfully (page ${page}, total ${total})`
    };
  }

  async findById(id: number): Promise<ApiResponse<Farm | null>> {
    const farm = await this.repo.findById(id);
    if (!farm) {
      return {
        success: true,
        data: null,
        message: 'Farm not found'
      };
    }
    return {
      success: true,
      data: farm,
      message: 'Farm retrieved successfully'
    };
  }

  async update(id: number, data: Partial<Farm>): Promise<ApiResponse<Farm | null>> {
    const farm = await this.repo.update(id, data);
    if (!farm) {
      return {
        success: true,
        data: null,
        message: 'Farm not found'
      };
    }
    return {
      success: true,
      data: farm,
      message: 'Farm updated successfully'
    };
  }

  async delete(id: number): Promise<ApiResponse<null>> {
    await this.repo.delete(id);
    return {
      success: true,
      data: null,
      message: 'Farm deleted successfully'
    };
  }

  async findByState(state: string): Promise<ApiResponse<Farm[]>> {
    const farms = await this.repo.findByState(state);
    if (farms.length === 0) {
      return {
        success: true,
        data: [],
        message: 'No farms found in this state'
      };
    }
    return {
      success: true,
      data: farms,
      message: 'Farms retrieved successfully'
    };
  }

  async listByProducerId(producerId: number): Promise<Farm[]> {
    return this.repo.listByProducerId(producerId);
  }

  async findProducerByFarmId(farmId: number): Promise<ApiResponse<Producer | null>> {
    const farm = await this.repo.findById(farmId, ['producer']);
    if (!farm || !farm.producer) {
      return {
        success: true,
        data: null,
        message: 'Producer not found for this farm'
      };
    }
    return {
      success: true,
      data: farm.producer,
      message: 'Producer retrieved successfully'
    };
  }

  async findHarvestsByFarmId(farmId: number): Promise<ApiResponse<any[]>> {
    const harvests = await this.harvestService.listByFarmId(farmId);
    if (harvests.length === 0) {
      return {
        success: true,
        data: [],
        message: 'No harvests found for this farm'
      };
    }
    return {
      success: true,
      data: harvests,
      message: 'Harvests retrieved successfully'
    };
  }

  async findCultivatesByFarmId(farmId: number): Promise<ApiResponse<Cultivate[]>> {
    const harvests = await this.findHarvestsByFarmId(farmId);
    if (!harvests.data || harvests.data.length === 0) {
      return {
        success: true,
        data: [],
        message: 'No cultivates found for this farm'
      };
    }
    const harvestIds = harvests.data.map(harvest => harvest.id);
    const cultivates = await this.cultivateService.listByHarvestIds(harvestIds);
    return {
      success: true,
      data: cultivates,
      message: 'Cultivates retrieved successfully'
    };
  }
}