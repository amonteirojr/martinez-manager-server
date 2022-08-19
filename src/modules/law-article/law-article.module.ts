import { Module } from '@nestjs/common';
import { LawArticleService } from './law-article.service';
import { LawArticleController } from './law-article.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LawArticle } from './entities/law-article.entity';

@Module({
  imports: [TypeOrmModule.forFeature([LawArticle])],
  controllers: [LawArticleController],
  providers: [LawArticleService],
})
export class LawArticleModule {}
