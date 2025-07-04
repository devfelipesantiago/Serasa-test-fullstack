import { IsString, IsNotEmpty, MinLength, IsOptional, IsNumber, ValidateNested, ArrayMinSize } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateFarmDto } from './farm.dto';

export class CreateProducerDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3, { message: 'The name must have at least 3 characters' })
  name!: string;

  @IsString()
  @IsNotEmpty()
  document!: string;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreateFarmDto)
  farms?: CreateFarmDto[];
}

export class UpdateProducerDto {
  @IsOptional()
  @IsString()
  @MinLength(3, { message: 'The name must have at least 3 characters' })
  name?: string;

  @IsOptional()
  @IsString()
  document?: string;
}

export class ProducerResponseDto {
  @IsNumber()
  id!: number;

  @IsString()
  name!: string;

  @IsString()
  document!: string;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreateFarmDto)
  farms?: CreateFarmDto[];

  created_at!: Date;
}
