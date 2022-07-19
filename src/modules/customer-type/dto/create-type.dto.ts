import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateTypeDTO {
  @ApiProperty({
    description: 'Nome do tipo de cliente',
    example: 'Prefeitura Municipal',
    type: String,
  })
  @IsString()
  name: string;
}
