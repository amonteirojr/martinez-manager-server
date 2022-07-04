import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsISO8601,
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { BiddingModalityEnum } from 'src/enums/BiddingModality';
import { PaymentModesEnum } from 'src/enums/PaymentMode';

export class CreateContractDTO {
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
  ourContractNumber: string;

  @ApiProperty({
    description: 'Ano do nosso número de contrato',
    example: '2022',
    type: String,
    maxLength: 4,
  })
  @IsNotEmpty()
  @IsNumberString()
  @MaxLength(4)
  ourContractYear: string;

  @ApiProperty({
    description: 'Número do contrato do cliente',
    example: '123456',
    type: String,
    maxLength: 6,
    nullable: true,
  })
  @IsNumberString()
  @MaxLength(6)
  @IsOptional()
  customerContractNumber: string;

  @ApiProperty({
    description: 'Ano do número do contrato do cliente',
    example: '2022',
    type: String,
    maxLength: 4,
    nullable: true,
  })
  @IsNumberString()
  @MaxLength(4)
  @IsOptional()
  customerContractYear: string;

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
    description: 'Classificação do processo licitatório',
    example: 'Example',
    type: String,
  })
  @IsString()
  biddingClassification: string;

  @ApiProperty({
    description: 'Modalidade do proc. licitatório',
    example: 'SOLICITATION_OF_PRICE',
    type: BiddingModalityEnum,
  })
  @IsEnum(BiddingModalityEnum)
  biddingModality: BiddingModalityEnum;

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
    description: 'Modo de pagamento',
    example: 'PIX',
    type: PaymentModesEnum,
  })
  @IsEnum(PaymentModesEnum)
  paymentMode: PaymentModesEnum;
}
