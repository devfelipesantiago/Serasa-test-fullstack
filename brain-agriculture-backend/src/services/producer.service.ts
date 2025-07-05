import { IProducerRepository } from '../model/repositories/interfaces/producer-repository.interface';
import { Producer } from '../model/entities/producer.entity';
import { isValidCnpj, isValidCpf } from '../utils/validDocument.utils';
import { FarmService } from './farm.service';
import { HarvestService } from './harvest.service';
import { CultivateService } from './cultivate.service';
import { Cultivate } from '../model/entities/cultivate.entity';
import { ApiResponse } from '../utils/responseHandler.utils';
import { DashboardDataDto } from '../dtos/DashboardDataDto';
import { Farm } from '../model/entities/farm.entity';

export class ProducerService {
  constructor(
    private repo: IProducerRepository,
    private farmService: FarmService,
    private harvestService: HarvestService,
    private cultivateService: CultivateService
  ) { }

  async createProducer(data: Partial<Producer>): Promise<ApiResponse<Producer>> {
    const { document, name } = data;
    if (!document) {
      throw new Error('Document is required.');
    }
    const newDocument = document.replace(/\D/g, '');
    if (!(isValidCpf(newDocument) || isValidCnpj(newDocument))) {
      throw new Error('Document is invalid.');
    }
    const existing = await this.repo.findByDocument(document);
    if (existing) {
      throw new Error('Producer already exists!');
    }
    const producer = await this.repo.create(data);
    return {
      success: true,
      data: producer,
      message: 'Producer created successfully'
    };
  }

  async findAll(page = 1, limit = 20): Promise<ApiResponse<Producer[]>> {
    const offset = (page - 1) * limit;

    const repo = (this.repo as any).repo || this.repo;
    const [producers, total] = await repo.createQueryBuilder('producer')
      .skip(offset)
      .take(limit)
      .getManyAndCount();
    return {
      success: true,
      data: producers,
      message: `Producers retrieved successfully (page ${page}, total ${total})`
    };
  }

  async findById(id: number): Promise<ApiResponse<Producer | null>> {
    const producer = await this.repo.findById(id);
    if (!producer) {
      return {
        success: true,
        data: null,
        message: 'Producer not found'
      };
    }
    return {
      success: true,
      data: producer,
      message: 'Producer retrieved successfully'
    };
  }

  async update(id: number, data: Partial<Producer>): Promise<ApiResponse<Producer | null>> {
    const producer = await this.repo.update(id, data);
    if (!producer) {
      return {
        success: true,
        data: null,
        message: 'Producer not found'
      };
    }
    return {
      success: true,
      data: producer,
      message: 'Producer updated successfully'
    };
  }

  async delete(id: number): Promise<ApiResponse<null>> {
    await this.repo.delete(id);
    return {
      success: true,
      data: null,
      message: 'Producer deleted successfully'
    };
  }

  async findByDocument(document: string): Promise<ApiResponse<Producer | null>> {
    const producer = await this.repo.findByDocument(document);
    if (!producer) {
      return {
        success: true,
        data: null,
        message: 'Producer not found with this document'
      };
    }
    return {
      success: true,
      data: producer,
      message: 'Producer retrieved successfully'
    };
  }

  async findFarmsByProducerId(producerId: number): Promise<ApiResponse<any[]>> {
    const farms = await this.farmService.listByProducerId(producerId);
    if (farms.length === 0) {
      return {
        success: true,
        data: [],
        message: 'No farms found for this producer'
      };
    }
    return {
      success: true,
      data: farms,
      message: 'Farms retrieved successfully'
    };
  }

  async findHarvestsByProducerId(producerId: number): Promise<ApiResponse<any[]>> {
    const farms = await this.farmService.listByProducerId(producerId);
    if (farms.length === 0) {
      return {
        success: true,
        data: [],
        message: 'No harvests found for this producer'
      };
    }
    const farmIds = farms.map(farm => farm.id);
    const harvests = await this.harvestService.listByFarmIds(farmIds);
    return {
      success: true,
      data: harvests,
      message: 'Harvests retrieved successfully'
    };
  }

  async findCultivatesByProducerId(producerId: number): Promise<ApiResponse<Cultivate[]>> {
    const harvests = await this.findHarvestsByProducerId(producerId);
    if (!harvests.data || harvests.data.length === 0) {
      return {
        success: true,
        data: [],
        message: 'No cultivates found for this producer'
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

  async getDashboardData(): Promise<ApiResponse<DashboardDataDto>> {
    const farmsResponse = await this.farmService.findAll();
    const cultivatesResponse = await this.cultivateService.findAll();

    const allFarms = farmsResponse.data;
    const allCultivates = cultivatesResponse.data;

    const totalFarms = (allFarms ?? []).length;
    const totalArea = (allFarms ?? []).reduce((sum: number, farm: Farm) => sum + Number(farm.totalArea), 0);

    const stateDistribution = (allFarms ?? []).reduce((acc: Record<string, number>, farm: Farm) => {
      const state = farm.state ?? 'Empty';
      acc[state] = (acc[state] || 0) + 1;
      return acc;
    }, {});

    const landUse = (allFarms ?? []).reduce((acc: { arableArea: number; vegetationArea: number }, farm: Farm) => {
      acc.arableArea += Number(farm.arableArea);
      acc.vegetationArea += Number(farm.vegetationArea);
      return acc;
    }, { arableArea: 0, vegetationArea: 0 });

    const cultureDistribution = (allCultivates ?? []).reduce((acc: Record<string, number>, cultivate: Cultivate) => {
      const cultureName = cultivate.name;
      acc[cultureName] = (acc[cultureName] || 0) + 1;
      return acc;
    }, {});

    const dashboardData: DashboardDataDto = {
      totalFarms,
      totalArea,
      stateDistribution,
      cultureDistribution,
      landUse,
    };

    return {
      success: true,
      data: dashboardData,
      message: 'Dashboard data retrieved successfully'
    };
  }
}