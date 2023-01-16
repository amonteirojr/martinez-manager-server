import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsISO8601,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { InvoiceStatusEnum } from 'src/enums/InvoiceStatus';

export class CreateInvoiceDto {
  @ApiProperty({
    description: 'Número da NF',
    example: '000001234',
    type: String,
  })
  @MaxLength(9)
  @IsString()
  invoiceNumber: string;

  @ApiProperty({
    description: 'Data da NF',
    example: '2022-12-31',
    type: String,
  })
  @IsOptional()
  @IsString()
  @IsISO8601()
  invoiceDate?: string;

  @ApiProperty({
    description: 'ID do Contrato',
    example: 1,
    type: Number,
  })
  @IsNumber()
  contractId?: number;

  @ApiProperty({
    description: 'Status da NF',
  })
  @IsEnum(InvoiceStatusEnum)
  status: InvoiceStatusEnum;

  @ApiProperty({
    description: 'Data do pagamento da NF',
    example: '2022-12-31',
    type: String,
  })
  @IsOptional()
  @IsString()
  @IsISO8601()
  paymentDate?: string;

  @ApiProperty({
    description: 'Valor da NF',
    example: 100000,
    type: Number,
  })
  @IsOptional()
  @IsNumber()
  value?: number;
}
