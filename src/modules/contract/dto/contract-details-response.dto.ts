import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { CreateOrUpdateContractDTO } from './create-or-update-contract.dto';

export class ContractDetailsResponseDTO extends CreateOrUpdateContractDTO {
  @ApiProperty({
    description: 'Vigência final atual do contrato',
    example: '2022-08-23',
    type: Number,
  })
  @IsNotEmpty()
  @IsString()
  finalDate: string;

  @ApiProperty({
    description: 'Valor atual do contrato',
    example: 10000,
    type: Number,
  })
  @IsNotEmpty()
  @IsNumber()
  actualMonthValue: number;
}
