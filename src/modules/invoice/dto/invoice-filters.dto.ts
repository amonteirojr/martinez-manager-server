import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsISO8601,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { InvoiceStatusEnum } from 'src/enums/InvoiceStatus';

export class InvoiceFiltersDTO {
  @IsOptional()
  @IsString()
  @MaxLength(9)
  invoiceNumber?: string;

  @IsOptional()
  @IsString()
  @IsISO8601()
  invoiceDate?: string;

  @IsOptional()
  @IsString()
  contractId?: string;

  @IsOptional()
  @IsString()
  status?: InvoiceStatusEnum;

  @IsOptional()
  @IsString()
  @IsISO8601()
  paymentDate?: string;

  @IsOptional()
  @IsString()
  isPaid?: string;

  @IsOptional()
  @IsNumber()
  value?: number;

  @IsOptional()
  @IsString()
  customerId?: string;
}
