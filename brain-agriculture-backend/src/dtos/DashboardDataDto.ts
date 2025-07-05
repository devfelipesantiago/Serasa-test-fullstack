export interface DashboardDataDto {
  totalFarms: number;
  totalArea: number;
  stateDistribution: Record<string, number>;
  cultureDistribution: Record<string, number>;
  landUse: {
    arableArea: number;
    vegetationArea: number;
  };
}