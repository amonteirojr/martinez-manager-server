import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsEnum,
  IsISO8601,
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { SystemsModulesType } from '../../../enums/SystemsModulesType';

export class SystemsModulesDTO {
  @IsNumber()
  id?: number;

  @IsNumber()
  systemModuleId: number;

  @IsEnum(SystemsModulesType)
  type?: SystemsModulesType;

  @IsString()
  @IsOptional()
  deploymentDate?: string;

  @IsString()
  @IsOptional()
  deploymentResponsible?: string;

  @IsString()
  @IsOptional()
  comments?: string;
}

export class CreateOrUpdateContractDTO {
  @ApiProperty({
    description: 'ID do cliente',
    example: 1,
    type: Number,
  })
  @IsNotEmpty()
  @IsNumber()
  customerId: number;

  @ApiProperty({
    description: 'Nosso número de contrato',
    example: '000001',
    type: String,
    maxLength: 6,
  })
  @IsNotEmpty()
  @IsNumberString()
  @MaxLength(6)
  contractNumber: string;

  @ApiProperty({
    description: 'Ano do nosso número de contrato',
    example: '2022',
    type: String,
    maxLength: 4,
  })
  @IsNotEmpty()
  @IsNumberString()
  @MaxLength(4)
  contractYear: string;

  @ApiProperty({
    description: 'Objeto do contrato',
    example: 'Contrato de aluguel de sistemas',
    type: String,
    nullable: true,
  })
  @IsString()
  @IsOptional()
  subject: string;

  @ApiProperty({
    description: 'Valor inicial do contrato',
    example: 10000,
    type: Number,
  })
  @IsNumber()
  @IsNotEmpty()
  initialValue: number;

  @ApiProperty({
    description: 'Número da licitação',
    example: '1234',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  biddingNumber: string;

  @ApiProperty({
    description: 'Ano da licitação',
    example: '2022',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  biddingYear: string;

  @ApiProperty({
    description: 'Data de assinatura do contrato',
    example: '2022-10-01',
    format: 'ISO_8601',
  })
  @IsISO8601()
  @IsNotEmpty()
  signatureDate: string;

  @ApiProperty({
    description: 'Data de vigência inicial',
    example: '2022-10-01',
    format: 'ISO_8601',
  })
  @IsISO8601()
  @IsNotEmpty()
  initialValidity: string;

  @ApiProperty({
    description: 'Data de vigência final',
    example: '2022-10-01',
    format: 'ISO_8601',
  })
  @IsISO8601()
  @IsNotEmpty()
  finalValidity: string;

  @ApiProperty({
    description: 'Nome do responsável pelo contrato (Martinez)',
    example: 'Fulano de Tal',
    type: String,
  })
  @IsString()
  responsible: string;

  @ApiProperty({
    description: 'Nome do responsável pelo contrato (Entidade)',
    example: 'Ciclano de Tal',
    type: String,
  })
  @IsString()
  customerResponsible: string;

  @ApiProperty({
    description: 'ID do Tipo de licitação',
    type: Number,
  })
  @IsNumber()
  biddingModalityId: number;

  @ApiProperty({
    description: 'ID do artigo da lei',
    type: Number,
  })
  @IsNumber()
  @IsOptional()
  lawArticleId?: number;

  @ApiProperty({
    description: 'Número da modalidade',
    example: 1,
    type: Number,
  })
  @IsNumber()
  @IsNotEmpty()
  biddingModalityNumber: number;

  @ApiProperty({
    description: 'Índice de reajuste',
    example: 'Índice',
    type: String,
  })
  @IsString()
  @IsOptional()
  readjustmentIndex: string;

  @ApiProperty({
    description: 'ID do Modo de pagamento',
    type: Number,
  })
  @IsOptional()
  @IsNumber()
  paymentModeId?: number;

  @IsArray()
  systems?: SystemsModulesDTO[];

  @IsArray()
  modules?: SystemsModulesDTO[];
}
