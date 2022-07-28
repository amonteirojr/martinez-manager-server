import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CustomerResponseDTO {
  @IsNumber()
  customerId?: number;

  @IsString()
  customerName: string;

  @IsString()
  document: string;

  @IsNumber()
  typeId: number;

  @IsString()
  @IsOptional()
  typeName?: string;

  @IsString()
  @IsOptional()
  referenceContactName?: string;

  @IsString()
  @IsOptional()
  referenceContactPhone?: string;

  @IsString()
  address: string;

  @IsString()
  number: string;

  @IsString()
  @IsOptional()
  complement?: string;

  @IsString()
  neighborhood: string;

  @IsString()
  zipCode: string;

  @IsNumber()
  cityId: number;

  @IsString()
  cityName: string;
}
