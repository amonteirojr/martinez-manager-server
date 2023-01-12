import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class ContractFiltersDTO {
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
  actualValue?: string;

  @IsOptional()
  @IsString()
  initialValidity?: string;

  @IsOptional()
  @IsString()
  finalValidity?: string;

  @IsOptional()
  @IsString()
  hasAdmentment?: string;

  @IsOptional()
  @IsString()
  isExpired?: string;

  @IsOptional()
  @IsBoolean()
  showItems?: boolean;
}
