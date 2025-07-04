import { ICultivateRepository } from '../model/repositories/interfaces/cultivate-repository.interface'
import { Cultivate } from '../model/entities/cultivate.entity';
import { ApiResponse } from '../utils/responseHandler.utils';

export class CultivateService {
  constructor(private repo: ICultivateRepository) { }

  async createCultivate(data: Partial<Cultivate>): Promise<ApiResponse<Cultivate>> {
    const cultivate = await this.repo.create(data);
    return {
      success: true,
      data: cultivate,
      message: 'Cultivate created successfully'
    };
  }

  async findAll(page = 1, limit = 20): Promise<ApiResponse<Cultivate[]>> {
    const offset = (page - 1) * limit;
    const repo = (this.repo as any).repo || this.repo;
    const [cultivates, total] = await repo.createQueryBuilder('cultivate')
      .skip(offset)
      .take(limit)
      .getManyAndCount();
    return {
      success: true,
      data: cultivates,
      message: `Cultivates retrieved successfully (page ${page}, total ${total})`
    };
  }

  async findById(id: number): Promise<ApiResponse<Cultivate | null>> {
    const cultivate = await this.repo.findById(id);
    if (!cultivate) {
      return {
        success: true,
        data: null,
        message: 'Cultivate not found'
      };
    }
    return {
      success: true,
      data: cultivate,
      message: 'Cultivate retrieved successfully'
    };
  }

  async update(id: number, data: Partial<Cultivate>): Promise<ApiResponse<Cultivate | null>> {
    const cultivate = await this.repo.update(id, data);
    if (!cultivate) {
      return {
        success: true,
        data: null,
        message: 'Cultivate not found'
      };
    }
    return {
      success: true,
      data: cultivate,
      message: 'Cultivate updated successfully'
    };
  }

  async delete(id: number): Promise<ApiResponse<null>> {
    await this.repo.delete(id);
    return {
      success: true,
      data: null,
      message: 'Cultivate deleted successfully'
    };
  }

  async listByFarmId(farmId: number): Promise<ApiResponse<Cultivate[]>> {
    const cultivates = await this.repo.listByFarmId(farmId);
    if (cultivates.length === 0) {
      return {
        success: true,
        data: [],
        message: 'No cultivates found for this farm'
      };
    }
    return {
      success: true,
      data: cultivates,
      message: 'Cultivates retrieved successfully'
    };
  }

  async listByHarvestIds(harvestIds: number[]): Promise<Cultivate[]> {
    return this.repo.listByHarvestIds(harvestIds);
  }

  async listByIdHarvestAndFarm(cultivateId: number): Promise<ApiResponse<Cultivate | null>> {
    const cultivate = await this.repo.listByIdHarvestAndFarm(cultivateId, ['harvest', 'harvest.farm']);
    if (!cultivate) {
      return {
        success: true,
        data: null,
        message: 'Cultivate not found'
      };
    }
    return {
      success: true,
      data: cultivate,
      message: 'Cultivate retrieved successfully'
    };
  }
}