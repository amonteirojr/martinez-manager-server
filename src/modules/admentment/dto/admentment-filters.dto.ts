import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class AdmentmentFiltersDTO {
  @IsOptional()
  @IsString()
  contractNumber?: string;

  @IsOptional()
  @IsString()
  contractYear?: string;

  @IsOptional()
  @IsString()
  customer?: string;

  @IsOptional()
  @IsString()
  admentmentNumber?: string;

  @IsOptional()
  @IsString()
  initialDate?: string;

  @IsOptional()
  @IsString()
  finalDate?: string;

  @IsOptional()
  @IsString()
  showItems?: string;
}
