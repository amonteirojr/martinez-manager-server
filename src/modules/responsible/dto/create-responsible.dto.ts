import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateResponsibleDto {
  @ApiProperty({
    description: 'Nome do responsável',
    example: 'Fulano de tal',
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  name: string;
}
