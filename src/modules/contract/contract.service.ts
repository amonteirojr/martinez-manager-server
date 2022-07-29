import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import AppDataSource from 'src/database/datasource';
import { SystemsModulesType } from '../../enums/SystemsModulesType';
import { CodeErrors } from 'src/shared/code-errors.enum';
import { Repository } from 'typeorm';
import { ContractsSystemsModules } from '../contracts-systems-modules/entities/contracts-systems-modules.entity';
import { SystemService } from '../system/system.service';
import { ContractInfoCountResponseDTO } from './dto/contract-info-count-response.dto';
import { ContractTableResponseDTO } from './dto/contract-table-response.dto';
import { CreateOrUpdateContractDTO } from './dto/create-or-update-contract.dto';
import { UpdateContractResponseDTO } from './dto/update-contract-response.dto';
import { Contract } from './entitites/contract.entity';

@Injectable()
export class ContractService {
  private readonly logger = new Logger(ContractService.name);

  constructor(
    @InjectRepository(Contract)
    private readonly contractRepository: Repository<Contract>,
    private readonly systemService: SystemService,
  ) {}

  async getContractSummary(): Promise<ContractInfoCountResponseDTO> {
    try {
      const [list, count] = await this.contractRepository.findAndCount();

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

  async getAllContracts(): Promise<Contract[]> {
    try {
      return await this.contractRepository.find();
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
          ourContractNumber: `${contract.ourContractNumber}/${contract.ourContractYear}`,
          validity: new Date(contract.finalValidity).toLocaleString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
          }),
          value: contract.initialValue.toLocaleString('pt-BR', {
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

  async getContractById(id: number): Promise<Contract> {
    try {
      return await this.contractRepository.findOne({
        where: { contractId: id },
        relations: {
          files: true,
        },
      });
    } catch (err) {
      this.logger.error(`Failed to get contract by id ${id}. Cause: ${err}`);

      throw new InternalServerErrorException({
        code: CodeErrors.FAIL_TO_GET_CONTRACTS,
        message: `Failed to get contract by id ${id}`,
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
        Promise.all(
          systems.map(async (system) => {
            const newSystem = {
              ...system,
              type: SystemsModulesType.SYSTEM,
              contractId: id,
            } as ContractsSystemsModules;

            await queryRunner.manager.save(ContractsSystemsModules, newSystem);
          }),
        );
      }

      await queryRunner.manager.delete(ContractsSystemsModules, {
        contractId: id,
        type: SystemsModulesType.MODULE,
      });

      if (modules && modules.length > 0) {
        Promise.all(
          modules.map(async (mod) => {
            const newModule = {
              ...mod,
              type: SystemsModulesType.MODULE,
              contractId: id,
            } as ContractsSystemsModules;

            await queryRunner.manager.save(ContractsSystemsModules, newModule);
          }),
        );
      }

      if (updated)
        this.logger.log(
          `Contract id ${id} and number ${data.ourContractNumber} was updated`,
        );

      await queryRunner.commitTransaction();

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
              type: SystemsModulesType.SYSTEM,
              contractId: contract.contractId,
            } as ContractsSystemsModules),
        );

        await queryRunner.manager.save(ContractsSystemsModules, newSystems);
      }

      if (modules && modules.length > 0) {
        const newModules = modules.map(
          (mod) =>
            ({
              ...mod,
              type: SystemsModulesType.MODULE,
              contractId: contract.contractId,
            } as ContractsSystemsModules),
        );

        await queryRunner.manager.save(ContractsSystemsModules, {
          data: newModules,
        });
      }

      await queryRunner.commitTransaction();
      return contract;
    } catch (err) {
      await queryRunner.rollbackTransaction();
      this.logger.error(
        `Failed to create contract number ${data.ourContractNumber}. Cause: ${err}`,
      );

      if (
        err instanceof BadRequestException ||
        err instanceof InternalServerErrorException
      )
        throw err;

      throw new InternalServerErrorException({
        code: CodeErrors.FAIL_TO_GET_CONTRACTS,
        message: `Failed to create contract ${data.ourContractNumber}`,
      });
    } finally {
      await queryRunner.release();
    }
  }
}
