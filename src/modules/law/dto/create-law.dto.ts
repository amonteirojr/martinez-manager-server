import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';
import { LawArticle } from 'src/modules/law-article/entities/law-article.entity';

export class CreateLawDto {
  @ApiProperty({
    type: Number,
    description: 'ID da lei',
  })
  @IsNumber()
  @IsOptional()
  @IsPositive()
  lawId?: number;

  @ApiProperty({
    type: String,
    description: 'Número da lei',
  })
  @IsNotEmpty()
  @IsString()
  lawNumber: string;

  @ApiProperty({
    type: String,
    description: 'Descrição da lei',
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    type: Array<LawArticle>,
    description: 'Artigos da lei',
  })
  @IsOptional()
  @IsArray()
  articles?: LawArticle[];
}
