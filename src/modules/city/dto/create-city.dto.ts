import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, MaxLength } from 'class-validator';

export class CreateCityDTO {
  @ApiProperty({
    description: 'Nome da cidade',
    example: 'Votuporanga',
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  cityName: string;

  @ApiProperty({
    description: 'População do município',
    example: 123456,
    type: Number,
  })
  @IsNumber()
  @IsNotEmpty()
  cityPopulation?: number;

  @ApiProperty({
    description: 'Código do IBGE',
    example: 1,
    type: Number,
  })
  @IsNumber()
  @IsNotEmpty()
  ibgeCode: number;

  @ApiProperty({
    description: 'Estado',
    example: 'SP',
    type: String,
    maxLength: 2,
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(2)
  state: string;
}
