import { PartialType } from '@nestjs/swagger';
import { CreateLawArticleDto } from './create-law-article.dto';

export class UpdateLawArticleDto extends PartialType(CreateLawArticleDto) {}
