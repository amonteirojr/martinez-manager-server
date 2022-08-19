import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CodeErrors } from 'src/shared/code-errors.enum';
import { Repository } from 'typeorm';
import { CreateLawArticleDto } from './dto/create-law-article.dto';
import { UpdateLawArticleDto } from './dto/update-law-article.dto';
import { LawArticle } from './entities/law-article.entity';

@Injectable()
export class LawArticleService {
  private readonly logger = new Logger(LawArticleService.name);
  constructor(
    @InjectRepository(LawArticle)
    private readonly lawArticleRepository: Repository<LawArticle>,
  ) {}

  async create(createLawArticleDto: CreateLawArticleDto): Promise<LawArticle> {
    try {
      return await this.lawArticleRepository.create(createLawArticleDto).save();
    } catch (err) {
      this.logger.error(
        `Failed to create a law article ${createLawArticleDto.article}. Cause: ${err}`,
      );

      throw new InternalServerErrorException({
        code: CodeErrors.FAIL_TO_CREATE_LAW_ARTICLE,
        message: 'Failed to create a law article',
      });
    }
  }

  async findAll(): Promise<LawArticle[]> {
    try {
      return await this.lawArticleRepository.find({ relations: { law: true } });
    } catch (err) {
      this.logger.error(`Failed to return all law articles. Cause: ${err}`);

      throw new InternalServerErrorException({
        code: CodeErrors.FAIL_TO_GET_ALL_LAW_ARTICLES,
        message: 'Failed to return all law articles',
      });
    }
  }

  async findOne(id: number): Promise<LawArticle> {
    try {
      return await this.lawArticleRepository.findOne({
        where: { articleId: id },
        relations: { law: true },
      });
    } catch (err) {
      this.logger.error(`Failed to get law article id ${id}. Cause: ${err}`);

      throw new InternalServerErrorException({
        code: CodeErrors.FAIL_TO_GET_LAW_ARTICLE,
        message: 'Failed to get law article',
      });
    }
  }

  async update(
    id: number,
    updateLawArticleDto: UpdateLawArticleDto,
  ): Promise<void> {
    try {
      await this.lawArticleRepository.update(
        { articleId: id },
        updateLawArticleDto,
      );
    } catch (err) {
      this.logger.error(
        `Failed to update law article ${updateLawArticleDto.article}. Cause: ${err}`,
      );

      throw new InternalServerErrorException({
        code: CodeErrors.FAIL_TO_UPDATE_LAW_ARTICLE,
        message: 'Failed to update law article',
      });
    }
  }

  async remove(id: number): Promise<void> {
    try {
      await this.lawArticleRepository.delete({ articleId: id });
    } catch (err) {
      this.logger.error(`Failed to delelte law article ${id}. Cause: ${err}`);

      throw new InternalServerErrorException({
        code: CodeErrors.FAIL_TO_DELETE_LAW_ARTICLE,
        message: 'Failed to delete law article',
      });
    }
  }
}
