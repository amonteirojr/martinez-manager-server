import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import AppDataSource from 'src/database/datasource';
import { CodeErrors } from 'src/shared/code-errors.enum';
import { FindOptionsWhere, Raw, Repository } from 'typeorm';
import { CreateAdmentmentDTO } from './dto/create-admentment.dto';
import { Admentment } from './entities/admentment.entity';
import { File } from '../file/entitites/file.entity';
import { ContractsSystems } from '../contracts-systems/entities/contracts-systems.entity';
import { ModulesDTO } from '../contract/dto/create-or-update-contract.dto';
import { ContractsSystemsModules } from '../contracts-systems-modules/entities/contracts-systems-modules.entity';
import { currencyFormatter } from 'src/shared/formatters';

import { launch } from 'puppeteer';
import { generateHtmlFromTemplate } from 'src/shared/report-functions';
import { pdfOptions } from 'src/shared/pdfStructure';
import { toLocalDate } from 'src/shared/localDateFormatter';
import { AdmentmentFiltersDTO } from './dto/admentment-filters.dto';
import { Contract } from '../contract/entitites/contract.entity';

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

  async getAll(filters?: AdmentmentFiltersDTO): Promise<Admentment[]> {
    try {
      let where: FindOptionsWhere<Admentment> = {};
      let contract: FindOptionsWhere<Contract> = {};

      if (filters.admentmentNumber && filters.admentmentNumber.length > 0) {
        where = {
          ...where,
          admentmentNumber: filters.admentmentNumber,
        };
      }

      if (filters.contractNumber && filters.contractNumber.length > 0) {
        contract = {
          contractNumber: filters.contractNumber,
        };

        where = {
          ...where,
          contract,
        };
      }

      if (filters.contractYear && filters.contractYear.length > 0) {
        contract = {
          ...contract,
          contractYear: filters.contractYear,
        };

        where = {
          ...where,
          contract,
        };
      }

      if (filters.customer && parseInt(filters.customer) > 0) {
        contract = {
          ...contract,
          customerId: parseInt(filters.customer),
        };

        where = {
          ...where,
          contract,
        };
      }

      if (filters.finalDate) {
        where = {
          ...where,
          finalDate: Raw((alias) => `${alias} <= '${filters.finalDate}'`),
        };
      }

      if (filters.initialDate) {
        where = {
          ...where,
          initialDate: Raw((alias) => `${alias} >= '${filters.initialDate}'`),
        };
      }

      return this.admentmentRepository.find({
        where,
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

  async getAdmentmentListReportData(): Promise<Array<object>> {
    try {
      const admentments = await this.admentmentRepository.find({
        relations: {
          admentmentType: true,
          contract: true,
          systems: {
            system: true,
            modules: {
              module: true,
            },
          },
        },
        order: {
          admentmentId: 'ASC',
        },
      });

      const result = admentments.map((admentment) => {
        const admentmentSystems = admentment.systems.map((system) => {
          const systemModules = system.modules.map((mod) => ({
            ...mod,
            monthValue: currencyFormatter(mod.monthValue),
            deploymentDate: toLocalDate(mod.deploymentDate),
          }));

          return {
            ...system,
            deploymentDate: toLocalDate(system.deploymentDate),
            monthValue: currencyFormatter(system.monthValue),
            modules: systemModules,
          };
        });

        return {
          ...admentment,
          finalDate: toLocalDate(admentment.finalDate),
          initialDate: toLocalDate(admentment.initialDate),
          signatureDate: toLocalDate(admentment.signatureDate),
          monthValue: currencyFormatter(admentment.monthValue),
          systems: admentmentSystems,
        };
      });

      return result;
    } catch (err) {
      this.logger.error(`Failed to get admentments. Cause: ${err}`);

      throw new InternalServerErrorException({
        code: CodeErrors.FAIL_TO_GET_ADMENTMENT,
        message: 'Failed to get admentments',
      });
    }
  }

  async printAdmentmentList(showItems: boolean): Promise<Buffer> {
    try {
      const browser = await launch({ headless: true });
      const page = await browser.newPage();
      const admentments = await this.getAdmentmentListReportData();

      const html = await generateHtmlFromTemplate(
        { admentments, showItems },
        'admentment-list.ejs',
      );

      await page.setContent(html, { waitUntil: 'networkidle0' });

      const pdf = await page.pdf({
        ...pdfOptions(),
        landscape: true,
      });

      await browser.close();

      return pdf;
    } catch (err) {
      this.logger.error(
        `Failed generate admentment list report. Cause: ${err}`,
      );
      throw new InternalServerErrorException({
        code: CodeErrors.FAIL_TO_GENERATE_HTML_FROM_EJS,
        message: err.message,
      });
    }
  }
}
