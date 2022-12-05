import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import AppDataSource from 'src/database/datasource';
import { CodeErrors } from 'src/shared/code-errors.enum';
import { Repository } from 'typeorm';
import { AdmentmentsSystemsModules } from '../admentments-systems-modules/entities/admentments-systems-modules.entity';
import { CreateAdmentmentDTO } from './dto/create-admentment.dto';
import { Admentment } from './entities/admentment.entity';
import { File } from '../file/entitites/file.entity';
import { ContractsSystems } from '../contracts-systems/entities/contracts-systems.entity';
import { ModulesDTO } from '../contract/dto/create-or-update-contract.dto';
import { ContractsSystemsModules } from '../contracts-systems-modules/entities/contracts-systems-modules.entity';

@Injectable()
export class AdmentmentService {
  private readonly logger = new Logger(AdmentmentService.name);
  constructor(
    @InjectRepository(Admentment)
    private readonly admentmentRepository: Repository<Admentment>,
  ) {}

  async createAdmentment(dto: CreateAdmentmentDTO): Promise<Admentment> {
    const { systems } = dto;

    const dataSource = !AppDataSource.isInitialized
      ? await AppDataSource.initialize()
      : AppDataSource;

    const queryRunner = dataSource.createQueryRunner();
    if (!queryRunner.connection) await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const admentment = await queryRunner.manager.save(Admentment, dto);

      if (systems && systems.length > 0) {
        await Promise.all(
          systems.map(async (system) => {
            const newSystem = {
              ...system,
              deploymentDate: system.deploymentDate || null,
              contractId: dto.contractId,
              installments: system.installments || null,
              admentmentId: admentment.admentmentId,
              monthValue: system.monthValue,
            } as Partial<ContractsSystems>;

            const { id } = await queryRunner.manager.save(
              ContractsSystems,
              newSystem,
            );

            const { modules } = system;

            if (modules && modules.length > 0) {
              const newModules = modules.map(
                (mod) =>
                  ({
                    ...mod,
                    deploymentDate: mod.deploymentDate || null,
                    installments: mod.installments || null,
                    moduleId: mod.moduleId,
                    contractSystemId: id,
                  } as ModulesDTO),
              );

              await queryRunner.manager.save(
                ContractsSystemsModules,
                newModules,
              );
            }
          }),
        );
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
    const { systems } = data;

    const dataSource = !AppDataSource.isInitialized
      ? await AppDataSource.initialize()
      : AppDataSource;

    const queryRunner = dataSource.createQueryRunner();
    if (!queryRunner.connection) await queryRunner.connect();
    await queryRunner.startTransaction();

    delete data.systems;

    try {
      await queryRunner.manager.update(Admentment, { admentmentId: id }, data);

      const { contractId } = data;

      const contractsSystem = await queryRunner.manager.find(ContractsSystems, {
        where: { contractId, admentmentId: id },
      });

      if (contractsSystem && contractsSystem.length > 0) {
        await Promise.all(
          contractsSystem.map(async (system) => {
            await queryRunner.manager.delete(ContractsSystemsModules, {
              contractSystemId: system.id,
            });
          }),
        );

        await queryRunner.manager.delete(ContractsSystems, {
          contractId,
          admentmentId: id,
        });
      }

      if (systems && systems.length > 0) {
        await Promise.all(
          systems.map(async (system) => {
            const newSystem = {
              ...system,
              deploymentDate: system.deploymentDate || null,
              contractId,
              admentmentId: id,
              installments: system.installments || null,
              monthValue: system.monthValue,
            } as Partial<ContractsSystems>;

            const { id: contractSystemId } = await queryRunner.manager.save(
              ContractsSystems,
              newSystem,
            );

            const { modules } = system;

            if (modules && modules.length > 0) {
              const newModules = modules.map(
                (mod) =>
                  ({
                    ...mod,
                    deploymentDate: mod.deploymentDate || null,
                    installments: mod.installments || null,
                    moduleId: mod.moduleId,
                    contractSystemId,
                  } as ModulesDTO),
              );

              await queryRunner.manager.save(
                ContractsSystemsModules,
                newModules,
              );
            }
          }),
        );
      }
      await queryRunner.commitTransaction();

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

  async getById(id: number): Promise<Admentment> {
    try {
      const admentment = await this.admentmentRepository.findOne({
        where: { admentmentId: id },
        relations: {
          files: true,
          systems: {
            modules: true,
          },
        },
      });

      return admentment;
    } catch (err) {
      this.logger.error(`Failed to get admentment by id ${id}. Cause: ${err}`);

      throw new InternalServerErrorException({
        code: CodeErrors.FAIL_TO_GET_ADMENTMENT,
        message: 'Failed to get admentment by id',
      });
    }
  }

  async deleteById(id: number): Promise<void> {
    const dataSource = !AppDataSource.isInitialized
      ? await AppDataSource.initialize()
      : AppDataSource;

    const queryRunner = dataSource.createQueryRunner();
    if (!queryRunner.connection) await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      await queryRunner.manager.delete(File, {
        admentmentId: id,
      });

      const systems = await queryRunner.manager.find(ContractsSystems, {
        where: { admentmentId: id },
      });

      if (systems && systems.length > 0) {
        await Promise.all(
          systems.map(async (system) => {
            await queryRunner.manager.delete(ContractsSystemsModules, {
              contractSystemId: system.id,
            });
          }),
        );

        await queryRunner.manager.delete(ContractsSystems, {
          admentmentId: id,
        });
      }

      await queryRunner.manager.delete(Admentment, {
        admentmentId: id,
      });

      await queryRunner.commitTransaction();
    } catch (err) {
      this.logger.error(`Failed to get admentment by id ${id}. Cause: ${err}`);

      throw new InternalServerErrorException({
        code: CodeErrors.FAIL_TO_GET_ADMENTMENT,
        message: 'Failed to get admentment by id',
      });
    } finally {
      await queryRunner.release();
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
