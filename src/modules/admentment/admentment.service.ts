import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import AppDataSource from 'src/database/datasource';
import { SystemsModulesType } from '../../enums/SystemsModulesType';
import { CodeErrors } from 'src/shared/code-errors.enum';
import { Repository } from 'typeorm';
import { AdmentmentsSystemsModulesDTO } from '../admentments-systems-modules/dto/create-admentments-systems-modules.dto';
import { AdmentmentsSystemsModules } from '../admentments-systems-modules/entities/admentments-systems-modules.entity';
import { CreateAdmentmentDTO } from './dto/create-admentment.dto';
import { Admentment } from './entities/admentment.entity';

@Injectable()
export class AdmentmentService {
  private readonly logger = new Logger(AdmentmentService.name);
  constructor(
    @InjectRepository(Admentment)
    private readonly admentmentRepository: Repository<Admentment>,
  ) {}

  async createAdmentment(dto: CreateAdmentmentDTO): Promise<Admentment> {
    const { systems, modules } = dto;

    const dataSource = !AppDataSource.isInitialized
      ? await AppDataSource.initialize()
      : AppDataSource;

    const queryRunner = dataSource.createQueryRunner();
    if (!queryRunner.connection) await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const admentment = await queryRunner.manager.save(Admentment, dto);

      if (systems && systems.length > 0) {
        const newSystems = systems.map(
          (system) =>
            ({
              ...system,
              type: SystemsModulesType.SYSTEM,
              admentmentId: dto.admentmentId,
            } as AdmentmentsSystemsModulesDTO),
        );

        await queryRunner.manager.save(AdmentmentsSystemsModules, newSystems);
      }

      if (modules && modules.length > 0) {
        const newModules = modules.map(
          (mod) =>
            ({
              ...mod,
              type: SystemsModulesType.MODULE,
              admentmentId: dto.admentmentId,
            } as AdmentmentsSystemsModulesDTO),
        );

        await queryRunner.manager.save(AdmentmentsSystemsModules, {
          data: newModules,
        });
      }

      await queryRunner.commitTransaction();
      return admentment;
    } catch (err) {
      await queryRunner.rollbackTransaction();
      this.logger.error(
        `Failed to create admentment ${dto.admentmentNumber}. Cause: ${err}`,
      );

      throw new InternalServerErrorException({
        code: CodeErrors.FAIL_TO_CREATE_ADMENTMENT,
        message: 'Failed to create admentment',
      });
    } finally {
      await queryRunner.release();
    }
  }

  async updateAdmentmentById(
    id: number,
    data: CreateAdmentmentDTO,
  ): Promise<{ admentmentId: number }> {
    const { systems, modules } = data;

    const dataSource = !AppDataSource.isInitialized
      ? await AppDataSource.initialize()
      : AppDataSource;

    const queryRunner = dataSource.createQueryRunner();
    if (!queryRunner.connection) await queryRunner.connect();
    await queryRunner.startTransaction();

    delete data.modules;
    delete data.systems;

    try {
      const updated = await queryRunner.manager.update(
        Admentment,
        { admentmentId: id },
        data,
      );

      await queryRunner.manager.delete(AdmentmentsSystemsModules, {
        admentmentId: id,
        type: SystemsModulesType.SYSTEM,
      });

      if (systems && systems.length > 0) {
        const newSystems = systems.map(
          (system) =>
            ({
              ...system,
              type: SystemsModulesType.SYSTEM,
              admentmentId: data.admentmentId,
            } as AdmentmentsSystemsModulesDTO),
        );

        await queryRunner.manager.save(AdmentmentsSystemsModules, newSystems);
      }

      await queryRunner.manager.delete(AdmentmentsSystemsModules, {
        admentmentId: id,
        type: SystemsModulesType.MODULE,
      });

      if (modules && modules.length > 0) {
        const newModules = modules.map(
          (mod) =>
            ({
              ...mod,
              type: SystemsModulesType.MODULE,
              admentmentId: data.admentmentId,
            } as AdmentmentsSystemsModulesDTO),
        );

        await queryRunner.manager.save(AdmentmentsSystemsModules, {
          data: newModules,
        });
      }

      await queryRunner.commitTransaction();

      if (updated)
        this.logger.log(
          `Admentment id ${id} and number ${data.admentmentNumber} was updated`,
        );

      return { admentmentId: id };
    } catch (err) {
      this.logger.error(
        `Failed to update admentment with id ${id}. Cause: ${err}`,
      );

      throw new InternalServerErrorException({
        code: CodeErrors.FAIL_TO_UPDATE_ADMENTMENT,
        message: `Failed to update admentment with id ${id}`,
      });
    } finally {
      await queryRunner.release();
    }
  }

  async getById(id: number): Promise<any> {
    try {
      const admentment = await this.admentmentRepository.findOne({
        where: { admentmentId: id },
        relations: {
          files: true,
          systems: true,
        },
      });

      if (admentment) {
        const result = {
          ...admentment,
          systems: admentment.systems.filter(
            (f) => f.type === SystemsModulesType.SYSTEM,
          ),
          modules: admentment.systems.filter(
            (f) => f.type === SystemsModulesType.MODULE,
          ),
        };

        return result;
      }

      return;
    } catch (err) {
      this.logger.error(`Failed to get admentment by id ${id}. Cause: ${err}`);

      throw new InternalServerErrorException({
        code: CodeErrors.FAIL_TO_GET_ADMENTMENT,
        message: 'Failed to get admentment by id',
      });
    }
  }

  async deleteById(id: number): Promise<void> {
    try {
      await this.admentmentRepository.softDelete({ admentmentId: id });
    } catch (err) {
      this.logger.error(`Failed to get admentment by id ${id}. Cause: ${err}`);

      throw new InternalServerErrorException({
        code: CodeErrors.FAIL_TO_GET_ADMENTMENT,
        message: 'Failed to get admentment by id',
      });
    }
  }

  async getContractAdmentments(contractId: number): Promise<Admentment[]> {
    try {
      return this.admentmentRepository.find({ where: { contractId } });
    } catch (err) {
      this.logger.error(
        `Failed to get admentments for contractId ${contractId}. Cause: ${err}`,
      );

      throw new InternalServerErrorException({
        code: CodeErrors.FAIL_TO_GET_CONTRACT_ADMENTMENTS,
        message: `Failed to get admentments for contractId ${contractId}`,
      });
    }
  }

  async getAll(): Promise<Admentment[]> {
    try {
      return this.admentmentRepository.find({
        relations: {
          contract: {
            customer: {
              customerType: true,
            },
          },
        },
        order: {
          admentmentId: 'ASC',
        },
      });
    } catch (err) {
      this.logger.error(`Failed to get admentments. Cause: ${err}`);

      throw new InternalServerErrorException({
        code: CodeErrors.FAIL_TO_GET_ADMENTMENT,
        message: 'Failed to get admentments',
      });
    }
  }
}
