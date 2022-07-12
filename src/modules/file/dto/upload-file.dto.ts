import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class UploadFileDTO {
  @ApiProperty({
    description: 'ID do contrato',
    example: 1,
    type: Number,
  })
  @IsNumber()
  contractId: number;
}
