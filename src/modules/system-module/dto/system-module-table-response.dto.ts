import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class SystemModuleTableResponseDTO {
  @IsNumber()
  @IsOptional()
  moduleId?: number;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  systemName: string;

  @IsNumber()
  @IsNotEmpty()
  systemId: number;

  @IsString()
  @IsOptional()
  description?: string;
}
