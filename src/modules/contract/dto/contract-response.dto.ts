import { IsNumber, IsString } from 'class-validator';

export class ContractResponseDTO {
  @IsNumber()
  initialMonthValue: number;

  @IsNumber()
  actualMonthValue: number;

  @IsNumber()
  initialInstallments: number;

  @IsNumber()
  actualInstallments?: number;

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

  @IsNumber()
  monthValue?: number;
}
