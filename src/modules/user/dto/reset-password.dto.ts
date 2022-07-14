import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class ResetPasswordDTO {
  @ApiProperty({
    description: 'Nova senha',
    example: '1234',
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  newPassword: string;
}
