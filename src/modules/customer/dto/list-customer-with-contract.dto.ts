import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CustomerWithContractDTO {
  @ApiProperty({
    description: 'ID do cliente',
    example: 1,
    type: Number,
  })
  @IsNotEmpty()
  @IsNumber()
  customerId: number;

  @ApiProperty({
    description: 'Nome do cliente',
    example: 'Prefeitura Municipal de Votuporanga',
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  customerName: string;

  @ApiProperty({
    description: 'Documento do cliente',
    example: '01001001000113',
    type: String,
  })
  @IsString()
  document: string;

  @ApiProperty({
    description: 'Nome da cidade',
    example: 'Votuporanga',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  cityName: string;
}
