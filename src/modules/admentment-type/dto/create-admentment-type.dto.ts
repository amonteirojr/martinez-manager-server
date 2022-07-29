import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreateAdmentmentTypeDTO {
  @ApiProperty({
    description: 'Nome do tipo de aditamento',
    example: 'Aditamento de valor',
    type: String,
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Descrição do tipo de aditamento',
    type: String,
  })
  @IsString()
  @IsOptional()
  description?: string;
}
