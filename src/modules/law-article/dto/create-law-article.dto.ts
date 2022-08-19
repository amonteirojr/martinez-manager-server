import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsPositive, IsString } from 'class-validator';
import { BaseEntity } from 'typeorm';

export class CreateLawArticleDto extends BaseEntity {
  @ApiProperty({
    type: Number,
    description: 'ID do artigo da lei',
  })
  @IsOptional()
  @IsNumber()
  @IsPositive()
  articleId?: number;

  @ApiProperty({
    type: String,
    description: 'Artigo da lei',
  })
  @IsOptional()
  @IsString()
  article: string;

  @ApiProperty({
    type: String,
    description: 'Artigo da lei',
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    type: Number,
    description: 'ID da Lei',
  })
  @IsNumber()
  @IsPositive()
  lawId: number;
}
