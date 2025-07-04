import { IsNumber, IsNotEmpty, Min, IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateCultivateDto } from './cultivate.dto';

export class CreateHarvestDto {
  @IsNumber()
  @IsNotEmpty()
  //@Min(2000, { message: 'The year should be greater than 2000' })
  year!: number;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreateCultivateDto)
  cultivates?: CreateCultivateDto[];
}

export class UpdateHarvestDto {
  @IsOptional()
  @IsNumber()
  // @Min(2000, { message: 'The year should be greater than 2000' })
  year?: number;
}

export class HarvestResponseDto {
  @IsNumber()
  id!: number;

  @IsNumber()
  year!: number;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreateCultivateDto)
  cultivates?: CreateCultivateDto[];

  created_at!: Date;
}
