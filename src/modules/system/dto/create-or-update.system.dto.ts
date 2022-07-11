import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateOrUpdateSystemDTO {
  @ApiProperty({
    description: 'Nome do sistema (sigla)',
    example: 'SCPI',
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Descrição do sistema',
    example: 'Sistema de contabilidade pública',
    type: String,
  })
  @IsOptional()
  @IsString()
  description?: string;
}
