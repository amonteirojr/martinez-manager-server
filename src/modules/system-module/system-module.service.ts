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
import { CreateSystemModuleDTO } from './dto/create-module.dto';
import { SystemModuleTableResponseDTO } from './dto/system-module-table-response.dto';
import { SystemModule } from './entities/system-module.entity';

@Injectable()
export class SystemModuleService {
  private readonly logger = new Logger(SystemModuleService.name);

  constructor(
    @InjectRepository(SystemModule)
    private readonly moduleRepository: Repository<SystemModule>,
  ) {}

  async createSystemModule(dto: CreateSystemModuleDTO): Promise<SystemModule> {
    try {
      return await this.moduleRepository.create(dto).save();
    } catch (err) {
      this.logger.error(
        `Failed to create system module ${dto.name}. Cause: ${err}`,
      );

      if (err.code === '23505') {
        throw new ConflictException({
          code: CodeErrors.SYSTEM_MODULE_ALREADY_EXISTS,
          message: `System module ${dto.name} already exists`,
        });
      }

      if (err instanceof BadRequestException) {
        throw err;
      }

      throw new InternalServerErrorException({
        code: CodeErrors.FAIL_TO_CREATE_SYSTEM_MODULE,
        message: `Failed to create the system module ${dto.name}`,
      });
    }
  }

  async updateSystemModule(
    dto: CreateSystemModuleDTO,
    id: number,
  ): Promise<void> {
    try {
      await this.moduleRepository.update({ moduleId: id }, dto);
      return;
    } catch (err) {
      this.logger.error(
        `Failed to update system module ${dto.name}. Cause: ${err}`,
      );

      throw new InternalServerErrorException({
        code: CodeErrors.FAIL_TO_UPDATE_SYSTEM_MODULE,
        message: `Failed to update the system module ${dto.name}`,
      });
    }
  }

  async getSystemModules(): Promise<SystemModule[]> {
    try {
      return await this.moduleRepository.find();
    } catch (err) {
      this.logger.error(`Failed to find system modules. Cause: ${err}`);

      throw new InternalServerErrorException({
        code: CodeErrors.FAIL_TO_FIND_SYSTEM_MODULES,
        message: `Failed to find system modules`,
      });
    }
  }

  async getSystemModulesTableData(): Promise<SystemModuleTableResponseDTO[]> {
    try {
      const queryResult = await this.moduleRepository.find({
        relations: { system: true },
        order: {
          moduleId: 'ASC',
        },
      });

      const response = queryResult.map(
        (result) =>
          ({
            name: result.name,
            systemId: result.systemId,
            systemName: result.system.name,
            description: result.description,
            moduleId: result.moduleId,
          } as SystemModuleTableResponseDTO),
      );
      return response;
    } catch (err) {
      this.logger.error(`Failed to find system modules. Cause: ${err}`);

      throw new InternalServerErrorException({
        code: CodeErrors.FAIL_TO_FIND_SYSTEM_MODULES,
        message: `Failed to find system modules`,
      });
    }
  }

  async getSystemModuleById(id: number): Promise<SystemModule> {
    try {
      return await this.moduleRepository.findOne({ where: { moduleId: id } });
    } catch (err) {
      this.logger.error(`Failed to find system module. Cause: ${err}`);

      throw new InternalServerErrorException({
        code: CodeErrors.FAIL_TO_FIND_SYSTEM_MODULE,
        message: `Failed to find system module`,
      });
    }
  }
}
