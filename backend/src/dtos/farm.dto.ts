import { IsString, IsNotEmpty, IsNumber, Min, IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateHarvestDto } from './harvest.dto';

export class CreateFarmDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsOptional()
  city?: string;

  @IsString()
  @IsOptional()
  state?: string;

  @IsNumber()
  @Min(0, { message: 'The total area should be greater than 0' })
  totalArea!: number;

  @IsNumber()
  @Min(0, { message: 'The total area should be greater than 0' })
  arableArea!: number;

  @IsNumber()
  @Min(0, { message: 'The total area should be greater than 0' })
  vegetationArea!: number;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreateHarvestDto)
  harvests?: CreateHarvestDto[];
}

export class UpdateFarmDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  city?: string;

  @IsOptional()
  @IsString()
  state?: string;

  @IsOptional()
  @IsNumber()
  @Min(0, { message: 'The total area should be greater than 0' })
  totalArea?: number;

  @IsOptional()
  @IsNumber()
  @Min(0, { message: 'The total area should be greater than 0' })
  arableArea?: number;

  @IsOptional()
  @IsNumber()
  @Min(0, { message: 'The total area should be greater than 0' })
  vegetationArea?: number;
}

export class FarmResponseDto {
  @IsNumber()
  id!: number;

  @IsString()
  name!: string;

  @IsString()
  @IsOptional()
  city?: string;

  @IsString()
  @IsOptional()
  state?: string;

  @IsNumber()
  totalArea!: number;

  @IsNumber()
  arableArea!: number;

  @IsNumber()
  vegetationArea!: number;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreateHarvestDto)
  harvests?: CreateHarvestDto[];

  created_at!: Date;
}
