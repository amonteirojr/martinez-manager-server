import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CodeErrors } from 'src/shared/code-errors.enum';
import { Repository } from 'typeorm';
import { CreateResponsibleDto } from './dto/create-responsible.dto';
import { UpdateResponsibleDto } from './dto/update-responsible.dto';
import { Responsible } from './entities/responsible.entity';

@Injectable()
export class ResponsibleService {
  private readonly logger = new Logger(ResponsibleService.name);

  constructor(
    @InjectRepository(Responsible)
    private readonly responsibleRepository: Repository<Responsible>,
  ) {}

  async create(
    createResponsibleDto: CreateResponsibleDto,
  ): Promise<Responsible> {
    try {
      return await this.responsibleRepository
        .create(createResponsibleDto)
        .save();
    } catch (err) {
      this.logger.error(`Failed to create responsible. Cause: ${err}`);

      throw new InternalServerErrorException({
        code: CodeErrors.FAIL_TO_CREATE_RESPONSIBLE,
        message: `Failed to create responsible`,
      });
    }
  }

  async findAll(): Promise<Responsible[]> {
    try {
      return await this.responsibleRepository.find({
        order: {
          name: 'ASC',
        },
      });
    } catch (err) {
      this.logger.error(`Failed to get responsibles. Cause: ${err}`);

      throw new InternalServerErrorException({
        code: CodeErrors.FAIL_TO_GET_RESPONSIBLES,
        message: `Failed to GET all responsibles`,
      });
    }
  }

  async findOne(id: number): Promise<Responsible> {
    try {
      return await this.responsibleRepository.findOne({
        where: { responsibleId: id },
      });
    } catch (err) {
      this.logger.error(`Failed to get responsible by id ${id}. Cause: ${err}`);

      throw new InternalServerErrorException({
        code: CodeErrors.FAIL_TO_GET_RESPONSIBLE,
        message: `Failed to get responsible by id ${id}`,
      });
    }
  }

  async update(id: number, updateResponsibleDto: UpdateResponsibleDto) {
    try {
      return await this.responsibleRepository.update(
        { responsibleId: id },
        updateResponsibleDto,
      );
    } catch (err) {
      this.logger.error(`Failed to update responsible id ${id}. Cause: ${err}`);

      throw new InternalServerErrorException({
        code: CodeErrors.FAIL_TO_UPDATE_RESPONSIBLE,
        message: `Failed to update responsible`,
      });
    }
  }

  async remove(id: number) {
    try {
      return await this.responsibleRepository.delete({ responsibleId: id });
    } catch (err) {
      this.logger.error(
        `Failed to delete responsible by id ${id}. Cause: ${err}`,
      );

      throw new InternalServerErrorException({
        code: CodeErrors.FAIL_TO_DELETE_RESPONSIBLE,
        message: `Failed to delete responsible by id ${id}`,
      });
    }
  }
}
