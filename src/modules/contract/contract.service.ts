import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import AppDataSource from 'src/database/datasource';
import { CodeErrors } from 'src/shared/code-errors.enum';
import { Repository } from 'typeorm';
import { ContractsSystemsModules } from '../contracts-systems-modules/entities/contracts-systems-modules.entity';
import { ContractInfoCountResponseDTO } from './dto/contract-info-count-response.dto';
import { ContractTableResponseDTO } from './dto/contract-table-response.dto';
import {
  CreateOrUpdateContractDTO,
  ModulesDTO,
} from './dto/create-or-update-contract.dto';
import { UpdateContractResponseDTO } from './dto/update-contract-response.dto';
import { Contract } from './entitites/contract.entity';
import { format, sub } from 'date-fns';
import { Admentment } from '../admentment/entities/admentment.entity';
import { ContractResponseDTO } from './dto/contract-response.dto';
import { AdmentmentService } from '../admentment/admentment.service';
import { ContractDetailsResponseDTO } from './dto/contract-details-response.dto';
import { File } from '../file/entitites/file.entity';
import { ContractsSystems } from '../contracts-systems/entities/contracts-systems.entity';
import { ContractFiltersDTO } from './dto/contract-filters.dto';
import { launch } from 'puppeteer';
import { generateHtmlFromTemplate } from 'src/shared/report-functions';
import { toLocalDate } from 'src/shared/localDateFormatter';
import { currencyFormatter } from 'src/shared/formatters';
import { imgToBase64 } from 'src/shared/converters';
import { join } from 'path';
import { pdfOptions } from 'src/shared/pdfStructure';

@Injectable()
export class ContractService {
  private readonly logger = new Logger(ContractService.name);

  constructor(
    @InjectRepository(Contract)
    private readonly contractRepository: Repository<Contract>,
    private readonly admentmentService: AdmentmentService,
  ) {}

  async getContractSummary(): Promise<ContractInfoCountResponseDTO> {
    try {
      const contracts = await this.getContractsWithActualValues();
      const contractsToAmend = await this.filterContractsToAmend(contracts);
      const expiredContracts = await this.filterExpiredContracts(contracts);
      const contractsToBid = await this.filterContractsToBid(contracts);

      const response: ContractInfoCountResponseDTO = {
        contractsCount: contracts.length,
        contractsToAmend: contractsToAmend.length,
        contractsToBid: contractsToBid.length,
        expiredContracts: expiredContracts.length,
      };

      return response;
    } catch (err) {
      this.logger.error(`Failed to get contract summary. Cause: ${err}`);

      throw new InternalServerErrorException({
        code: CodeErrors.FAIL_TO_GET_CONTRACT_SUMMARY,
        message: 'Failed to get contract summary',
      });
    }
  }

  async filterExpiredContracts(
    actualContracts?: ContractResponseDTO[],
  ): Promise<ContractResponseDTO[]> {
    const today = new Date();
    const contracts =
      actualContracts || (await this.getContractsWithActualValues());

    return contracts.filter((contract) => {
      return new Date(contract.actualValidity).getTime() < today.getTime();
    });
  }

  async filterContractsToAmend(
    actualContracts?: ContractResponseDTO[],
  ): Promise<ContractResponseDTO[]> {
    const today = new Date();
    const contracts =
      actualContracts || (await this.getContractsWithActualValues());

    return contracts.filter((contract) => {
      const compareDate = sub(today, {
        months: 12,
      });

      const isToAmend =
        compareDate.getTime() >= new Date(contract.initialValidity).getTime();

      if (isToAmend) {
        const thirtyDaysSub = sub(new Date(contract.actualValidity), {
          days: 30,
        });

        return thirtyDaysSub.getTime() <= today.getTime();
      }
    });
  }

  async filterContractsToBid(
    actualContracts?: ContractResponseDTO[],
  ): Promise<ContractResponseDTO[]> {
    const today = new Date();
    const contracts =
      actualContracts || (await this.getContractsWithActualValues());

    return contracts.filter((contract) => {
      const compareDate = sub(today, {
        months: 48,
      });

      const isToBid =
        compareDate.getTime() >= new Date(contract.initialValidity).getTime();

      if (isToBid) {
        const ninetyDaysSUb = sub(new Date(contract.actualValidity), {
          days: 90,
        });

        return ninetyDaysSUb.getTime() <= today.getTime();
      }
    });
  }

  async getContractAdmentments(contractId: number): Promise<Admentment[]> {
    try {
      return await this.admentmentService.getContractAdmentments(contractId);
    } catch (err) {
      this.logger.error(`Failed to get contract admentments. Cause: ${err}`);

      throw new InternalServerErrorException({
        code: CodeErrors.FAIL_TO_GET_CONTRACT_ADMENTMENTS,
        message: 'Failed to get contract admentments',
      });
    }
  }

  contractFiltersToWhereClause(
    filters: ContractFiltersDTO,
    filterDate: string,
  ): string {
    let whereClause = '';

    if (filters?.contractNumber)
      whereClause += ` AND "contracts"."contractNumber" = '${filters.contractNumber}'`;

    if (filters?.contractYear)
      whereClause += ` AND "contracts"."contractYear" = '${filters.contractYear}'`;

    if (filters?.customer)
      whereClause += ` AND "contracts"."customerId" = '${filters.customer}'`;

    if (filters?.initialValidity)
      whereClause += ` AND "contracts"."initialValidity" = '${filters.initialValidity}'`;

    if (filters?.hasAdmentment === 'true')
      whereClause += ` AND (EXISTS(SELECT 1 FROM "admentments" x 
          WHERE x."contractId" = "contracts"."contractId"))`;

    if (filters?.isExpired === 'true')
      whereClause += ` AND coalesce((select 
          max(x."finalDate") 
        from admentments x 
        where 
          x."contractId" = contracts."contractId" 
          and x."initialDate" <= '${filterDate}' 
          and x."deletedAt" is null), contracts."finalValidity") < '${filterDate}'`;

    if (filters?.finalValidity)
      whereClause += ` AND coalesce((select 
            max(x."finalDate") 
            from admentments x 
          where 
            x."contractId" = contracts."contractId" 
            and x."initialDate" <= '${filterDate}' 
            and x."deletedAt" is null), contracts."finalValidity") <= '${filterDate}'`;

    if (filters?.actualValue)
      whereClause += ` AND "contracts"."monthValue" + coalesce((select
            sum(x."monthValue")
            from admentments x
          where
            x."contractId" = contracts."contractId"
            and x."initialDate" <= '${filterDate}' 
            and x."deletedAt" is null), 0) = ${filters.actualValue}`;

    return whereClause;
  }

  async getContractsWithActualValues(
    filters?: ContractFiltersDTO,
  ): Promise<ContractResponseDTO[]> {
    const filterDate =
      filters?.finalValidity || format(new Date(), 'yyyy-MM-dd');

    const whereClause = this.contractFiltersToWhereClause(filters, filterDate);

    try {
      const sql = `SELECT DISTINCT
              contracts."monthValue" +
              coalesce((select
                            sum(x."monthValue")
                      from admentments x
                      where
                            x."contractId" = contracts."contractId"
                            and x."initialDate" <= '${filterDate}' 
                            and x."deletedAt" is null), 0)
              as "actualMonthValue",
            contracts.installments as "initialInstallments",
              coalesce((select 
                      max(x."finalDate") 
                    from admentments x 
                    where 
                      x."contractId" = contracts."contractId" 
                      and x."initialDate" <= '${filterDate}' 
                      and x."deletedAt" is null), contracts."finalValidity") 
              as "actualValidity",
              "contracts"."monthValue" as "initialMonthValue",
              "contracts"."initialValidity",
              "contracts"."contractId",
              "contracts"."contractNumber", 
              "contracts"."contractYear",
              "customer"."customerName",
              "customerType"."name" as "customerType" 
            FROM "contracts"
            LEFT JOIN "admentments" "ad" ON ad."contractId" = contracts."contractId"  
            INNER JOIN "customers" "customer" ON customer."customerId" = contracts."customerId"  
            INNER JOIN "customer_types" "customerType" ON "customerType"."typeId" = customer."typeId" 
            WHERE contracts."deletedAt" is null
            ${whereClause}  
            ORDER BY "contracts"."contractId"`;

      const result = await this.contractRepository.query(sql);

      return result;
    } catch (err) {
      this.logger.error(`Failed to get all contracts. Cause: ${err}`);

      throw new InternalServerErrorException({
        code: CodeErrors.FAIL_TO_GET_CONTRACTS,
        message: 'Failed to get all contracts',
      });
    }
  }

  async getContractDetailsById(
    id: number,
  ): Promise<ContractDetailsResponseDTO> {
    const today = new Date();
    const filterDate = format(today, 'yyyy-MM-dd');

    try {
      const contract = await this.contractRepository.findOne({
        where: {
          contractId: id,
        },
        order: {
          contractId: 'ASC',
          systems: {
            modules: {
              id: 'ASC',
            },
          },
        },
        relations: {
          biddingModality: true,
          customer: {
            city: true,
            customerType: true,
          },
          files: true,
          law: true,
          paymentMode: true,
          responsible: true,
          systems: {
            responsible: true,
            modules: {
              module: true,
              responsible: true,
            },
            system: true,
          },
          admentments: {
            files: true,
            admentmentType: true,
            systems: {
              responsible: true,
              modules: {
                module: true,
                responsible: true,
              },
              system: true,
            },
          },
        },
      });

      if (!contract) {
        this.logger.error(`Contract ID ${id} not found.`);
        throw new NotFoundException({
          code: CodeErrors.CONTRACT_NOT_FOUND,
          message: 'Contract not found',
        });
      }

      const [actualValues] = await this.contractRepository
        .query(`SELECT DISTINCT
                  contracts."monthValue" +
                  coalesce((select
                                sum(x."monthValue")
                          from admentments x
                          where
                                x."contractId" = contracts."contractId"
                                and x."deletedAt" is null
                                and x."initialDate" <= '${filterDate}'), 0)
                  as "actualMonthValue",
                  contracts.installments,
                  coalesce((select 
                          max(x."finalDate") 
                        from admentments x 
                        where 
                          x."contractId" = contracts."contractId" 
                          and x."deletedAt" is null
                          and x."initialDate" <= '${filterDate}' ), contracts."finalValidity") 
                  as "actualValidity"
                FROM "contracts"
                LEFT JOIN "admentments" "ad" ON ad."contractId" = contracts."contractId"  
                WHERE coalesce(ad."initialDate", contracts."initialValidity") <= '${filterDate}'
                AND contracts."deletedAt" is null
                AND "contracts"."contractId" = ${id}`);

      const onlyContractSystems = contract.systems.filter((system) => {
        return system.admentmentId === null;
      });

      return {
        ...contract,
        systems: onlyContractSystems,
        actualMonthValue: actualValues?.actualMonthValue || contract.monthValue,
        finalDate: actualValues?.actualValidity || contract.finalValidity,
      } as ContractDetailsResponseDTO;
    } catch (err) {
      this.logger.error(`Failed to get all contracts. Cause: ${err}`);

      throw new InternalServerErrorException({
        code: CodeErrors.FAIL_TO_GET_CONTRACTS,
        message: 'Failed to get all contracts',
      });
    }
  }

  async getAllContracts(): Promise<Contract[]> {
    try {
      return await this.contractRepository.find({
        relations: {
          admentments: true,
          customer: {
            customerType: true,
          },
          paymentMode: true,
          law: true,
        },
        order: {
          contractId: 'ASC',
        },
      });
    } catch (err) {
      this.logger.error(`Failed to get all contracts. Cause: ${err}`);

      throw new InternalServerErrorException({
        code: CodeErrors.FAIL_TO_GET_CONTRACTS,
        message: 'Failed to get all contracts',
      });
    }
  }

  async getContractsForTable(): Promise<ContractTableResponseDTO[]> {
    try {
      const contracts = await this.contractRepository.find({
        relations: ['customer', 'customer.city'],
        order: {
          contractId: 'ASC',
        },
      });

      const response: ContractTableResponseDTO[] = contracts.map((contract) => {
        return {
          contractId: contract.contractId,
          contractNumber: `${contract.contractNumber}/${contract.contractYear}`,
          validity: new Date(contract.finalValidity).toLocaleString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
          }),
          monthValue: contract.monthValue.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          }),
        } as ContractTableResponseDTO;
      });

      return response;
    } catch (err) {
      this.logger.error(`Failed to get contracts for table. Cause: ${err}`);

      throw new InternalServerErrorException({
        code: CodeErrors.FAIL_TO_GET_CONTRACTS,
        message: 'Failed to get contracts for table',
      });
    }
  }

  async getContractById(id: number): Promise<any> {
    try {
      const contract = await this.contractRepository.findOne({
        where: { contractId: id },
        relations: {
          files: true,
          customer: {
            customerType: true,
            city: true,
          },
          systems: {
            modules: true,
          },
          paymentMode: true,
          biddingModality: true,
          law: true,
        },
      });

      return contract;
    } catch (err) {
      this.logger.error(`Failed to get contract by id ${id}. Cause: ${err}`);

      throw new InternalServerErrorException({
        code: CodeErrors.FAIL_TO_GET_CONTRACTS,
        message: `Failed to get contract by id ${id}`,
      });
    }
  }

  async deleteContractById(id: number): Promise<void> {
    const dataSource = !AppDataSource.isInitialized
      ? await AppDataSource.initialize()
      : AppDataSource;

    const queryRunner = dataSource.createQueryRunner();
    if (!queryRunner.connection) await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const modulesId = await queryRunner.manager.find(ContractsSystems, {
        where: { contractId: id },
      });

      if (modulesId && modulesId.length > 0) {
        await Promise.all(
          modulesId.map(async (modId) => {
            await queryRunner.manager.delete(ContractsSystemsModules, {
              contractSystemId: modId.id,
            });
          }),
        );

        await queryRunner.manager.delete(ContractsSystems, {
          contractId: id,
        });
      }

      await queryRunner.manager.delete(File, {
        contractId: id,
      });

      await queryRunner.manager.delete(Contract, {
        contractId: id,
      });

      await queryRunner.commitTransaction();
    } catch (err) {
      this.logger.error(`Failed to delete contract by id ${id}. Cause: ${err}`);

      throw new InternalServerErrorException({
        code: CodeErrors.FAIL_TO_DELETE_CONTRACT,
        message: `Failed to DELETE contract by id ${id}`,
      });
    } finally {
      await queryRunner.release();
    }
  }

  async updateContractById(
    id: number,
    data: CreateOrUpdateContractDTO,
  ): Promise<UpdateContractResponseDTO> {
    const { systems } = data;

    const dataSource = !AppDataSource.isInitialized
      ? await AppDataSource.initialize()
      : AppDataSource;

    const queryRunner = dataSource.createQueryRunner();
    if (!queryRunner.connection) await queryRunner.connect();
    await queryRunner.startTransaction();

    delete data.systems;

    try {
      await queryRunner.manager.update(Contract, { contractId: id }, data);

      const contractSystems = await queryRunner.manager.find(ContractsSystems, {
        where: { contractId: id },
      });

      if (contractSystems && contractSystems.length > 0) {
        await Promise.all(
          contractSystems.map(async (contractSystem) => {
            await queryRunner.manager.delete(ContractsSystemsModules, {
              contractSystemId: contractSystem.id,
            });
          }),
        );

        await queryRunner.manager.delete(ContractsSystems, {
          contractId: id,
        });
      }

      if (systems && systems.length > 0) {
        await Promise.all(
          systems.map(async (system) => {
            const newSystem = {
              ...system,
              deploymentDate: system.deploymentDate || null,
              contractId: id,
            } as Partial<ContractsSystems>;

            const { id: contractSystemId } = await queryRunner.manager.save(
              ContractsSystems,
              newSystem,
            );

            const { modules } = system;

            if (modules && modules.length > 0) {
              const newModules = modules.map((mod) => ({
                ...mod,
                deploymentDate: mod.deploymentDate || null,
                installments: mod.installments || null,
                moduleId: mod.moduleId,
                contractSystemId,
              }));

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
        `Contract id ${id} and number ${data.contractNumber} was updated`,
      );

      return { contractId: id };
    } catch (err) {
      this.logger.error(
        `Failed to update contract with id ${id}. Cause: ${err}`,
      );

      throw new InternalServerErrorException({
        code: CodeErrors.FAIL_TO_UPDATE_CONTRACT,
        message: `Failed to update contract with id ${id}`,
      });
    } finally {
      await queryRunner.release();
    }
  }

  async createContract(data: CreateOrUpdateContractDTO): Promise<Contract> {
    const { systems } = data;

    const dataSource = !AppDataSource.isInitialized
      ? await AppDataSource.initialize()
      : AppDataSource;

    const queryRunner = dataSource.createQueryRunner();
    if (!queryRunner.connection) await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const contract = await queryRunner.manager.save(Contract, data);

      if (systems && systems.length > 0) {
        await Promise.all(
          systems.map(async (system) => {
            const newSystem = {
              ...system,
              deploymentDate: system.deploymentDate || null,
              contractId: contract.contractId,
              monthValue: system.monthValue,
            } as ContractsSystems;

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
                    moduleId: mod.id,
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
      return contract;
    } catch (err) {
      await queryRunner.rollbackTransaction();
      this.logger.error(
        `Failed to create contract number ${
          data.contractNumber
        }. Cause: ${JSON.stringify(err)}`,
      );

      if (
        err instanceof BadRequestException ||
        err instanceof InternalServerErrorException
      )
        throw err;

      if (err.code === '23505')
        throw new BadRequestException({
          code: 'DUPLICATED_RESOURCE',
          message: 'Contract already exists.',
        });

      throw new InternalServerErrorException({
        code: CodeErrors.FAIL_TO_CREATE_CONTRACT,
        message: `Failed to create contract ${data.contractNumber}`,
      });
    } finally {
      await queryRunner.release();
    }
  }

  async getContractListReportData(): Promise<
    {
      contract: any;
      actualMonthValue: string;
      finalDate: string;
    }[]
  > {
    const today = new Date();
    const filterDate = format(today, 'yyyy-MM-dd');

    try {
      const contracts = await this.contractRepository.find({
        order: {
          contractId: 'ASC',
          systems: {
            modules: {
              id: 'ASC',
            },
          },
        },
        relations: {
          biddingModality: true,
          customer: {
            city: true,
            customerType: true,
          },
          files: true,
          law: true,
          paymentMode: true,
          responsible: true,
          systems: {
            responsible: true,
            modules: {
              module: true,
              responsible: true,
            },
            system: true,
          },
          admentments: {
            files: true,
            admentmentType: true,
            systems: {
              responsible: true,
              modules: {
                module: true,
                responsible: true,
              },
              system: true,
            },
          },
        },
      });

      if (!contracts || contracts.length === 0) {
        throw new NotFoundException({
          code: CodeErrors.CONTRACT_NOT_FOUND,
          message: 'Resource not found',
        });
      }

      const actualValues = await this.contractRepository.query(`SELECT DISTINCT
                  contracts."monthValue" +
                  coalesce((select
                                sum(x."monthValue")
                          from admentments x
                          where
                                x."contractId" = contracts."contractId"
                                and x."deletedAt" is null
                                and x."initialDate" <= '${filterDate}'), 0)
                  as "actualMonthValue",
                  contracts.installments,
                  contracts."contractId",
                  coalesce((select 
                          max(x."finalDate") 
                        from admentments x 
                        where 
                          x."contractId" = contracts."contractId" 
                          and x."deletedAt" is null
                          and x."initialDate" <= '${filterDate}' ), contracts."finalValidity") 
                  as "actualValidity"
                FROM "contracts"
                LEFT JOIN "admentments" "ad" ON ad."contractId" = contracts."contractId"  
                WHERE coalesce(ad."initialDate", contracts."initialValidity") <= '${filterDate}'
                AND contracts."deletedAt" is null`);

      const response = contracts.map((cont) => {
        const val = actualValues.find(
          (actual) => actual.contractId === cont.contractId,
        );

        const contractSystems = cont.systems.map((system) => {
          const modules = system.modules.map((mod) => ({
            ...mod,
            deploymentDate: toLocalDate(mod.deploymentDate),
            monthValue: currencyFormatter(mod.monthValue),
          }));

          return {
            ...system,
            modules,
            deploymentDate: toLocalDate(system.deploymentDate),
            monthValue: currencyFormatter(system.monthValue),
          };
        });

        return {
          contract: {
            ...cont,
            initialValidity: toLocalDate(cont.initialValidity),
            finalValidity: toLocalDate(cont.finalValidity),
            signatureDate: toLocalDate(cont.signatureDate),
            monthValue: currencyFormatter(cont.monthValue),
            systems: contractSystems,
          },
          actualMonthValue: currencyFormatter(
            val?.actualMonthValue || cont.monthValue,
          ),
          finalDate: toLocalDate(val?.actualValidity || cont.finalValidity),
        };
      });

      return response;
    } catch (err) {
      this.logger.error(`Failed to get all contracts. Cause: ${err}`);

      throw new InternalServerErrorException({
        code: CodeErrors.FAIL_TO_GET_CONTRACTS,
        message: 'Failed to get all contracts',
      });
    }
  }

  async printContractList(showItems: boolean): Promise<Buffer> {
    try {
      const browser = await launch({ headless: true });
      const page = await browser.newPage();
      const contracts = await this.getContractListReportData();
      const html = await generateHtmlFromTemplate(
        { contracts, showItems },
        'contract-list.ejs',
      );

      await page.setContent(html, { waitUntil: 'networkidle0' });

      const pdf = await page.pdf({
        ...pdfOptions(),
        landscape: true,
      });

      await browser.close();

      return pdf;
    } catch (err) {
      this.logger.error(`Failed generate  contract list report. Cause: ${err}`);
      throw new InternalServerErrorException({
        code: CodeErrors.FAIL_TO_GENERATE_HTML_FROM_EJS,
        message: err.message,
      });
    }
  }
}
