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
  ourContractNumber: string;

  @IsString()
  ourContractYear: string;

  @IsString()
  customerName: string;

  @IsString()
  customerType: string;
}
