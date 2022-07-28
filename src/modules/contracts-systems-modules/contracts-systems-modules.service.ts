import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ContractsSystemsModules } from './entities/contracts-systems-modules.entity';

@Injectable()
export class ContractsSystemsModulesService {
  constructor(
    @InjectRepository(ContractsSystemsModules)
    private readonly systemsRepository: Repository<ContractsSystemsModules>,
  ) {}
}
