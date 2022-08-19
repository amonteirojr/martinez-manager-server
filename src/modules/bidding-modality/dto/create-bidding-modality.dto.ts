import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateBiddingModalityDto {
  @ApiProperty({
    description: 'ID do tipo de licitação',
    type: Number,
  })
  @IsOptional()
  @IsNumber()
  biddingModalityId?: number;

  @ApiProperty({
    description: 'Nome do tipo de licitação',
    type: String,
    example: 'Dispensa',
  })
  @IsNotEmpty()
  @IsString()
  biddingModality: string;
}
