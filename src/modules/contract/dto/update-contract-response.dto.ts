import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateContractResponseDTO {
  @ApiProperty({
    description: 'ID do contrato',
    example: 1,
    type: Number,
  })
  @IsNotEmpty()
  @IsNumber()
  contractId: number;
}
