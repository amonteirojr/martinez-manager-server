import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CodeErrors } from 'src/shared/code-errors.enum';
import { Repository } from 'typeorm';
import { CreateOrUpdateSystemDTO } from './dto/create-or-update.system.dto';

import { System } from './entities/system.entity';

@Injectable()
export class SystemService {
  private readonly logger = new Logger(SystemService.name);

  constructor(
    @InjectRepository(System)
    private readonly systemRepository: Repository<System>,
  ) {}

  async createSystem(systemDTO: CreateOrUpdateSystemDTO): Promise<System> {
    try {
      const system = this.systemRepository.create(systemDTO);
      return await this.systemRepository.save(system);
    } catch (err) {
      this.logger.error(
        `Failed to create system ${systemDTO.name}. Cause: ${err}`,
      );

      if (err.code === '23505') {
        throw new ConflictException({
          code: CodeErrors.SYSTEM_ALREADY_EXISTS,
          message: `System ${systemDTO.name} already exists`,
        });
      }

      if (err instanceof BadRequestException) {
        throw err;
      }

      throw new InternalServerErrorException({
        code: CodeErrors.FAIL_TO_CREATE_SYSTEM,
        message: `Failed to create the system ${systemDTO.name}`,
      });
    }
  }

  async getSystemById(id: number): Promise<System> {
    try {
      return await this.systemRepository.findOne({
        where: { systemId: id },
      });
    } catch (err) {
      this.logger.error(`Failed to find system by ID ${id}. Cause: ${err}`);

      throw new InternalServerErrorException({
        code: CodeErrors.FAIL_TO_FIND_SYSTEM,
        message: 'Failed to find system by ID',
      });
    }
  }

  async getAllSystems(): Promise<System[]> {
    try {
      return await this.systemRepository.find({ order: { systemId: 'ASC' } });
    } catch (err) {
      this.logger.error(`Failed to get all systems. Cause: ${err}`);

      throw new InternalServerErrorException({
        code: CodeErrors.FAIL_TO_GET_ALL_SYSTEMS,
        message: 'Failed to get all systems',
      });
    }
  }

  async updateSystemById(
    id: number,
    systemData: CreateOrUpdateSystemDTO,
  ): Promise<void> {
    try {
      const updated = await this.systemRepository.update(
        { systemId: id },
        systemData,
      );
      if (updated.affected > 0) {
        this.logger.log(`System id ${id} was updated`);
      }

      return;
    } catch (err) {
      this.logger.error(`Failed to update system id ${id}. Cause: ${err}`);

      throw new InternalServerErrorException({
        code: CodeErrors.FAIL_TO_UPDATE_SYSTEM,
        message: `Failed to update system id ${id}`,
      });
    }
  }

  async deleteSystemById(id: number): Promise<void> {
    try {
      const deleted = await this.systemRepository.delete({ systemId: id });
      if (deleted.affected > 0) {
        this.logger.log(`System id ${id} was deleted`);
      }

      return;
    } catch (err) {
      this.logger.error(`Failed to delete system id ${id}. Cause: ${err}`);

      throw new InternalServerErrorException({
        code: CodeErrors.FAIL_TO_DELETE_SYSTEM,
        message: `Failed to DELETE system id ${id}`,
      });
    }
  }
}
