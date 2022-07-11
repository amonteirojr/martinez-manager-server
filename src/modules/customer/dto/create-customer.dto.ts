import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateCustomerDTO {
  @ApiProperty({
    description: 'Nome do cliente',
    example: 'Prefeitura Municipal de Votuporanga',
    type: String,
  })
  @IsString()
  customerName: string;

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
