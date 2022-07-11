import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

class IbgeStateRegionDTO {
  @ApiProperty({
    description: 'ID da região',
    example: 11,
    type: Number,
  })
  @IsNumber()
  id: number;

  @ApiProperty({
    description: 'Sigla da região',
    example: 'N',
    type: String,
  })
  @IsString()
  sigla: string;

  @ApiProperty({
    description: 'Nome da região',
    example: 'Norte',
    type: String,
  })
  @IsString()
  nome: string;
}
export class IbgeStatesResponseDTO {
  @ApiProperty({
    description: 'ID do estado',
    example: 11,
    type: Number,
  })
  @IsNumber()
  id: number;

  @ApiProperty({
    description: 'Sigla do estado',
    example: 'SP',
    type: String,
  })
  @IsString()
  sigla: string;

  @ApiProperty({
    description: 'Nome do estado',
    example: 'São Paulo',
    type: String,
  })
  @IsString()
  nome: string;

  @ApiProperty({
    description: 'Região do estado',
    type: IbgeStateRegionDTO,
  })
  regiao: IbgeStateRegionDTO;
}
