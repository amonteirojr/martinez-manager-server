import { IsNumber, IsString } from 'class-validator';

export class ContractResponseDTO {
  @IsNumber()
  initialValue: number;

  @IsNumber()
  actualValue: number;

  @IsString()
  actualValidity: string;

  @IsString()
  initialValidity: string;

  @IsNumber()
  contractId: number;

  @IsString()
  contractNumber: string;

  @IsString()
  contractYear: string;

  @IsString()
  customerName: string;

  @IsString()
  customerType: string;
}
