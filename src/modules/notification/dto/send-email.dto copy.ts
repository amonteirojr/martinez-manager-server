import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class SendEmailDTO {
  @ApiProperty({
    description: 'Emails dos destinatários',
    type: Array<string>,
  })
  @IsNotEmpty()
  @IsArray()
  receivers: string[];

  @ApiProperty({
    description: 'Assunto',
    example: 'Assunto do e-mail',
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  subject: string;
}
