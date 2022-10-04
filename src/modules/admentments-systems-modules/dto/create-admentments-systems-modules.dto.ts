import { IsNumber, IsOptional, IsString } from 'class-validator';
import { SystemsModulesType } from '../../../enums/SystemsModulesType';

export class AdmentmentsSystemsModulesDTO {
  @IsOptional()
  @IsNumber()
  id?: number;

  type: SystemsModulesType;

  @IsNumber()
  systemModuleId: number;

  @IsString()
  deploymentDate?: string;

  @IsString()
  deploymentResponsible?: string;

  @IsString()
  @IsOptional()
  comments?: string;

  @IsNumber()
  admentmentId: number;

  @IsNumber()
  monthValue: number;

  @IsString()
  @IsOptional()
  @IsNumber()
  installments?: number;
}
