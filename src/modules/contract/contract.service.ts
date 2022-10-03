import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import AppDataSource from 'src/database/datasource';
import { SystemsModulesType } from '../../enums/SystemsModulesType';
import { CodeErrors } from 'src/shared/code-errors.enum';
import { Repository } from 'typeorm';
import { ContractsSystemsModules } from '../contracts-systems-modules/entities/contracts-systems-modules.entity';
import { ContractInfoCountResponseDTO } from './dto/contract-info-count-response.dto';
import { ContractTableResponseDTO } from './dto/contract-table-response.dto';
import { CreateOrUpdateContractDTO } from './dto/create-or-update-contract.dto';
import { UpdateContractResponseDTO } from './dto/update-contract-response.dto';
import { Contract } from './entitites/contract.entity';
import { format } from 'date-fns';
import { Admentment } from '../admentment/entities/admentment.entity';
import { ContractResponseDTO } from './dto/contract-response.dto';
import { AdmentmentService } from '../admentment/admentment.service';
import { ContractDetailsResponseDTO } from './dto/contract-details-response.dto';
import { filter } from 'rxjs';

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
      const [_, count] = await this.contractRepository.findAndCount();

      const response: ContractInfoCountResponseDTO = {
        contractsCount: count,
        contractsToAmend: 0,
        contractsToBid: 0,
        expiredContracts: 0,
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

  async getContractsWithActualValues(): Promise<ContractResponseDTO[]> {
    const filterDate = format(new Date(), 'yyyy-MM-dd');

    try {
      const result = await this.contractRepository.query(`SELECT DISTINCT
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
                ORDER BY "contracts"."contractId"`);

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
    const filterDate = format(new Date(), 'yyyy-MM-dd');

    try {
      const contract = await this.contractRepository.findOne({
        where: { contractId: id },
        relations: {
          biddingModality: true,
          customer: {
            city: true,
            customerType: true,
          },
          files: true,
          law: true,
          paymentMode: true,
          systems: true,
          admentments: true,
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
                INNER JOIN "customers" "customer" ON customer."customerId" = contracts."customerId"  
                INNER JOIN "customer_types" "customerType" ON "customerType"."typeId" = customer."typeId" 
                WHERE coalesce(ad."initialDate", contracts."initialValidity") <= '${filterDate}'
                AND contracts."deletedAt" is null
                AND "contracts"."contractId" = ${id}`);

      return {
        ...contract,
        systemsAndModules: contract.systems,
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
          systems: true,
          paymentMode: true,
          biddingModality: true,
          law: true,
        },
      });

      if (contract) {
        const result = {
          ...contract,
          systemsAndModules: contract.systems,
        };

        return result;
      }

      return;
    } catch (err) {
      this.logger.error(`Failed to get contract by id ${id}. Cause: ${err}`);

      throw new InternalServerErrorException({
        code: CodeErrors.FAIL_TO_GET_CONTRACTS,
        message: `Failed to get contract by id ${id}`,
      });
    }
  }

  async deleteContractById(id: number): Promise<void> {
    try {
      await this.contractRepository.delete({ contractId: id });
    } catch (err) {
      this.logger.error(`Failed to delete contract by id ${id}. Cause: ${err}`);

      throw new InternalServerErrorException({
        code: CodeErrors.FAIL_TO_DELETE_CONTRACT,
        message: `Failed to DELETE contract by id ${id}`,
      });
    }
  }

  async updateContractById(
    id: number,
    data: CreateOrUpdateContractDTO,
  ): Promise<UpdateContractResponseDTO> {
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
        Contract,
        { contractId: id },
        data,
      );

      await queryRunner.manager.delete(ContractsSystemsModules, {
        contractId: id,
        type: SystemsModulesType.SYSTEM,
      });

      if (systems && systems.length > 0) {
        const newSystems = systems.map(
          (system) =>
            ({
              ...system,
              deploymentDate: system.deploymentDate || null,
              type: SystemsModulesType.SYSTEM,
              contractId: id,
            } as ContractsSystemsModules),
        );

        await queryRunner.manager.save(ContractsSystemsModules, newSystems);
      }

      await queryRunner.manager.delete(ContractsSystemsModules, {
        contractId: id,
        type: SystemsModulesType.MODULE,
      });

      if (modules && modules.length > 0) {
        const newModules = modules.map(
          (mod) =>
            ({
              ...mod,
              deploymentDate: mod.deploymentDate || null,
              type: SystemsModulesType.MODULE,
              contractId: id,
            } as ContractsSystemsModules),
        );

        await queryRunner.manager.save(ContractsSystemsModules, newModules);
      }

      await queryRunner.commitTransaction();

      if (updated)
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
    const { systems, modules } = data;

    const dataSource = !AppDataSource.isInitialized
      ? await AppDataSource.initialize()
      : AppDataSource;

    const queryRunner = dataSource.createQueryRunner();
    if (!queryRunner.connection) await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const contract = await queryRunner.manager.save(Contract, data);

      if (systems && systems.length > 0) {
        const newSystems = systems.map(
          (system) =>
            ({
              ...system,
              deploymentDate: system.deploymentDate || null,
              type: SystemsModulesType.SYSTEM,
              contractId: contract.contractId,
              installments: system.installments || null,
            } as ContractsSystemsModules),
        );

        await queryRunner.manager.save(ContractsSystemsModules, newSystems);
      }

      if (modules && modules.length > 0) {
        const newModules = modules.map(
          (mod) =>
            ({
              ...mod,
              deploymentDate: mod.deploymentDate || null,
              type: SystemsModulesType.MODULE,
              contractId: contract.contractId,
              installments: mod.installments || null,
            } as ContractsSystemsModules),
        );

        await queryRunner.manager.save(ContractsSystemsModules, newModules);
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
}
