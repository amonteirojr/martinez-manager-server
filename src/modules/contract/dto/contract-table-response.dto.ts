import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsString,
} from 'class-validator';

export class ContractTableResponseDTO {
  @ApiProperty({
    description: 'ID do contrato',
    example: 1,
    type: Number,
  })
  @IsNumber()
  contractId: number;

  @ApiProperty({
    description: 'Nosso número de contrato',
    example: '000001/2022',
    type: String,
  })
  @IsNumberString()
  contractNumber: string;

  @ApiProperty({
    description: 'Nome do município',
    example: 'Modelandia',
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  cityName: string;

  @ApiProperty({
    description: 'Nome do cliente',
    example: 'Prefeitura',
    type: String,
  })
  @IsString()
  customerName: string;

  @ApiProperty({
    description: 'Data de vencimento',
    example: '2022-10-01',
  })
  @IsString()
  validity: string;

  @ApiProperty({
    description: 'Valor do contrato',
    example: 'R$ 10.000,00',
  })
  @IsString()
  value: string;
}
