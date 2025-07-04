import { IsString, IsNotEmpty, MinLength, IsOptional } from 'class-validator';

export class CreateCultivateDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(2, { message: 'The name must have at least 2 characters' })
  name!: string;
}

export class UpdateCultivateDto {
  @IsOptional()
  @IsString()
  @MinLength(2, { message: 'The name must have at least 2 characters' })
  name?: string;
}

export class CultivateResponseDto {
  id!: number;
  name!: string;
  created_at!: Date;
}
