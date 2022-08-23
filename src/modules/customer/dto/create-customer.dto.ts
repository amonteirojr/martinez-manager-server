import { ApiProperty } from '@nestjs/swagger';
import {
  IsISO8601,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateCustomerDTO {
  @ApiProperty({
    description: 'Nome do cliente',
    example: 'Prefeitura Municipal de Votuporanga',
    type: String,
  })
  @IsString()
  customerName: string;

  @ApiProperty({
    description: 'Documento do cliente',
    example: '01001001000113',
    type: String,
  })
  @IsString()
  @MaxLength(14)
  document: string;

  @ApiProperty({
    description: 'ID da cidade',
    example: 1,
    type: Number,
  })
  @IsNumber()
  cityId: number;

  @ApiProperty({
    description: 'ID do tipo',
    example: 1,
    type: Number,
  })
  @IsNumber()
  customerTypeId: number;

  @ApiProperty({
    description: 'Estado do município',
    example: 'SP',
    type: String,
  })
  @IsOptional()
  @IsString()
  state?: string;

  @ApiProperty({
    description: 'População',
    example: 90585,
    type: Number,
  })
  @IsOptional()
  @IsNumber()
  cityPopulation?: number;

  @ApiProperty({
    description: 'Pessoa para contato na entidade',
    example: 'Fulano de Tal',
    type: String,
  })
  @IsString()
  @IsOptional()
  referenceContactName?: string;

  @ApiProperty({
    description: 'Telefone de pessoa para contato',
    example: '17998887766',
    type: String,
  })
  @IsString()
  @IsOptional()
  referenceContactPhone?: string;

  @ApiProperty({
    description: 'Endereço da entidade',
    example: 'Rua dos Bobos',
    type: String,
  })
  @IsString()
  address: string;

  @ApiProperty({
    description: 'Número do endereço',
    example: '0',
    type: String,
  })
  @IsString()
  number: string;

  @ApiProperty({
    description: 'Complemento do endereço',
    example: 'Sala 1',
    type: String,
  })
  @IsString()
  @IsOptional()
  complement?: string;

  @ApiProperty({
    description: 'Bairro da entidade',
    example: 'Bairro Alto',
    type: String,
  })
  @IsString()
  neighborhood: string;

  @ApiProperty({
    description: 'CEP da entidade',
    example: '99999-000',
    type: String,
  })
  @IsString()
  zipCode: string;

  @ApiProperty({
    description: 'Data que passou a ser cliente',
    example: '2022-12-01',
  })
  @IsOptional()
  @IsISO8601()
  customerSince?: string;

  @ApiProperty({
    description: 'Informações adicionais',
    type: String,
  })
  @IsOptional()
  @IsString()
  aditionalInfo: string;

  @ApiProperty({
    description: 'Número de telefone',
    type: String,
    example: '99999999999',
  })
  @IsOptional()
  @IsString()
  phoneNumber?: string;
}
