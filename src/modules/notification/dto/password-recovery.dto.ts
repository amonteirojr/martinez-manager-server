import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class PasswordRecoveryDTO {
  @ApiProperty({
    description: 'Email dos destinatário',
    type: Array<string>,
  })
  @IsNotEmpty()
  @IsString()
  receiver: string;
}
