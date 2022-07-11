import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class ContractInfoCountResponseDTO {
  @ApiProperty({
    description: 'Quantidade total de contratos',
    example: 10,
    type: Number,
  })
  @IsNotEmpty()
  @IsNumber()
  contractsCount: number;

  @ApiProperty({
    description: 'Quantidade de contratos para aditar',
    example: 10,
    type: Number,
  })
  @IsNotEmpty()
  @IsNumber()
  contractsToAmend: number;

  @ApiProperty({
    description: 'Quantidade de contratos para licitar',
    example: 10,
    type: Number,
  })
  @IsNotEmpty()
  @IsNumber()
  contractsToBid: number;

  @ApiProperty({
    description: 'Quantidade de contratos vencidos',
    example: 2,
    type: Number,
  })
  @IsNotEmpty()
  @IsNumber()
  expiredContracts: number;
}
