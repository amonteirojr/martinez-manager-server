import { IsNumber, IsOptional, IsString } from 'class-validator';
import { SystemsModulesType } from '../../../enums/SystemsModulesType';

export class AdmentmentsSystemsModulesDTO {
  @IsOptional()
  @IsNumber()
  id?: number;

  type: SystemsModulesType;

  @IsNumber()
  systemModuleId: number;

  @IsNumber()
  monthValue: number;

  @IsOptional()
  @IsNumber()
  installments?: number;

  @IsString()
  @IsOptional()
  comments?: string;

  @IsNumber()
  admentmentId: number;
}
