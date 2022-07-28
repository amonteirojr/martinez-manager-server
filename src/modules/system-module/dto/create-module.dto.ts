import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateSystemModuleDTO {
  @IsNumber()
  @IsOptional()
  moduleId?: number;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  systemId: number;

  @IsString()
  @IsOptional()
  description?: string;
}
