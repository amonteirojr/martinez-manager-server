import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CitiesIbgeResponseDTO {
  @ApiProperty({
    description: 'ID da cidade no IBGE',
    example: 123456,
    type: Number,
  })
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @ApiProperty({
    description: 'Nome da cidade no IBGE',
    example: 'São José do Rio Preto',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  nome: string;
}
