import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty } from 'class-validator';

export class SendEmailDTO {
  @ApiProperty({
    description: 'Nome da role (grupo ou papel) do usuário',
    example: 'ADMIN',
    type: String,
  })
  @IsNotEmpty()
  @IsArray()
  receivers: string[];
}
