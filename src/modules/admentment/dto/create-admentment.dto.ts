import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { SystemsDTO } from 'src/modules/contract/dto/create-or-update-contract.dto';

export class CreateAdmentmentDTO {
  @ApiProperty({
    description: 'ID do contrato',
    example: 1,
    type: Number,
  })
  @IsNumber()
  contractId: number;

  @ApiProperty({
    description: 'Responsável pelo aditamento',
    type: String,
  })
  @IsString()
  @IsOptional()
  responsible?: string;

  @ApiProperty({
    description: 'Quantidade de parcelas',
    type: Number,
  })
  @IsOptional()
  @IsNumber()
  installments?: number;

  @ApiProperty({
    description: 'Valor mensal do aditamento',
    type: Number,
  })
  @IsNumber()
  @IsOptional()
  monthValue?: number;

  @ApiProperty({
    description: 'Data inicial da vigência',
    type: String,
  })
  @IsString()
  @IsOptional()
  initialDate?: string;

  @ApiProperty({
    description: 'Data final da vigência',
    type: String,
  })
  @IsString()
  @IsOptional()
  finalDate?: string;

  @ApiProperty({
    description: 'Informações adicionais',
    type: String,
  })
  @IsString()
  @IsOptional()
  comments?: string;

  @ApiProperty({
    description: 'Número do termo aditivo',
    type: String,
  })
  @IsString()
  admentmentNumber: string;

  @ApiProperty({
    description: 'Data de assinatuyra',
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  signatureDate: string;

  @ApiProperty({
    description: 'ID do tipo do aditamento',
    type: Number,
  })
  @IsNumber()
  admentmentTypeId: number;

  @ApiProperty({
    description: 'Percentual do reajuste publicado',
    type: Number,
  })
  @IsOptional()
  @IsNumber()
  readjustment?: number;

  @ApiProperty({
    description: 'Percentual do reajuste negociado',
    type: Number,
  })
  @IsOptional()
  @IsNumber()
  negotiatedReadjustment?: number;

  @ApiProperty({
    description: 'Sistemas do aditamento',
  })
  @IsOptional()
  systems?: SystemsDTO[];
}
