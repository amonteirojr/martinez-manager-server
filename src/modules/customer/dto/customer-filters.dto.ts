import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class CustomerFiltersDTO {
  @IsOptional()
  @IsString()
  customerName?: string;

  @IsOptional()
  @IsString()
  document?: string;

  @IsOptional()
  @IsString()
  typeId?: string;

  @IsOptional()
  @IsString()
  cityId?: string;

  @IsOptional()
  @IsBoolean()
  hasContract?: boolean;
}
