import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';
import { IbgeStatesResponseDTO } from './ibge-states-response.dto';

class IbgeCityMesorRegionDTO {
  @ApiProperty({
    description: 'ID da região',
    example: 11,
    type: Number,
  })
  @IsNumber()
  id: number;

  @ApiProperty({
    description: 'Nome da região',
    example: 'Macapá',
    type: String,
  })
  @IsString()
  nome: string;

  @ApiProperty({
    description: 'UF',
  })
  UF: IbgeStatesResponseDTO;
}

class IbgeCityMicroRegionDTO {
  @ApiProperty({
    description: 'ID da região',
    example: 11,
    type: Number,
  })
  @IsNumber()
  id: number;

  @ApiProperty({
    description: 'Nome da região',
    example: 'Macapá',
    type: String,
  })
  @IsString()
  nome: string;

  @ApiProperty({
    description: 'Mesoregião',
  })
  mesorregiao: IbgeCityMesorRegionDTO;
}

class IbgeCityIntermediaryRegionDTO {
  @ApiProperty({
    description: 'ID da região',
    example: 11,
    type: Number,
  })
  @IsNumber()
  id: number;

  @ApiProperty({
    description: 'Nome da região',
    example: 'Macapá',
    type: String,
  })
  @IsString()
  nome: string;

  @ApiProperty({
    description: 'UF',
  })
  UF: IbgeStatesResponseDTO;
}

class IbgeCityImediateRegionDTO {
  @ApiProperty({
    description: 'ID da região',
    example: 11,
    type: Number,
  })
  @IsNumber()
  id: number;

  @ApiProperty({
    description: 'Nome da região',
    example: 'Macapá',
    type: String,
  })
  @IsString()
  nome: string;

  @ApiProperty({
    description: 'Região intermediária',
  })
  'regiao-intermediaria': IbgeCityIntermediaryRegionDTO;
}

export class IbgeCityResponseDTO {
  @ApiProperty({
    description: 'ID da cidade',
    example: 11,
    type: Number,
  })
  @IsNumber()
  id: number;

  @ApiProperty({
    description: 'Nome da cidade',
    example: 'Macapá',
    type: String,
  })
  @IsString()
  nome: string;

  microrregiao: IbgeCityMicroRegionDTO;
  'regiao-imediata': IbgeCityImediateRegionDTO;
}
