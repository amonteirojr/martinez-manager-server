import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreatePaymentoModeDTO {
  @ApiProperty({
    description: 'ID do modo de pagamento',
    type: Number,
  })
  @IsOptional()
  @IsNumber()
  paymentModeId?: number;

  @ApiProperty({
    description: 'Nome do modo de pagamento',
    type: String,
    example: 'Dinheiro',
  })
  @IsNotEmpty()
  @IsString()
  paymentMode: string;
}
