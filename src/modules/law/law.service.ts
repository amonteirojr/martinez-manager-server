import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CodeErrors } from 'src/shared/code-errors.enum';
import { Repository } from 'typeorm';
import { CreateLawDto } from './dto/create-law.dto';
import { UpdateLawDto } from './dto/update-law.dto';
import { Law } from './entities/law.entity';

@Injectable()
export class LawService {
  private readonly logger = new Logger(LawService.name);
  constructor(
    @InjectRepository(Law)
    private readonly lawRepository: Repository<Law>,
  ) {}

  async create(createLawDto: CreateLawDto): Promise<Law> {
    try {
      return await this.lawRepository.create(createLawDto).save();
    } catch (err) {
      this.logger.error(
        `Failed to create a law number ${createLawDto.lawNumber}. Cause: ${err}`,
      );

      throw new InternalServerErrorException({
        code: CodeErrors.FAIL_TO_CREATE_LAW,
        message: 'Failed to create a law',
      });
    }
  }

  async findAll(): Promise<Law[]> {
    try {
      return await this.lawRepository.find({ relations: { articles: true } });
    } catch (err) {
      this.logger.error(`Failed to return all laws. Cause: ${err}`);

      throw new InternalServerErrorException({
        code: CodeErrors.FAIL_TO_GET_ALL_LAWS,
        message: 'Failed to return all laws',
      });
    }
  }

  async findOne(id: number): Promise<Law> {
    try {
      return await this.lawRepository.findOne({
        where: { lawId: id },
        relations: { articles: true },
      });
    } catch (err) {
      this.logger.error(`Failed to return law id ${id}. Cause: ${err}`);

      throw new InternalServerErrorException({
        code: CodeErrors.FAIL_TO_GET_LAW,
        message: `Failed to return law id ${id}`,
      });
    }
  }

  async update(id: number, updateLawDto: UpdateLawDto): Promise<void> {
    try {
      await this.lawRepository.update(
        {
          lawId: id,
        },
        updateLawDto,
      );
    } catch (err) {
      this.logger.error(`Failed to update law id ${id}. Cause: ${err}`);

      throw new InternalServerErrorException({
        code: CodeErrors.FAIL_TO_UPDATE_LAW,
        message: `Failed to update law id ${id}`,
      });
    }
  }

  async remove(id: number): Promise<void> {
    try {
      await this.lawRepository.delete({
        lawId: id,
      });
    } catch (err) {
      this.logger.error(`Failed to delete law id ${id}. Cause: ${err}`);

      throw new InternalServerErrorException({
        code: CodeErrors.FAIL_TO_DELETE_LAW,
        message: `Failed to delete law id ${id}`,
      });
    }
  }
}
