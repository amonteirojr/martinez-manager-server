import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';

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
}
