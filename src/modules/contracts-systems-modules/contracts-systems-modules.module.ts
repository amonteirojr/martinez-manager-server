import { Module } from '@nestjs/common';
import { ContractsSystemsModulesService } from './contracts-systems-modules.service';

import { TypeOrmModule } from '@nestjs/typeorm';
import { ContractsSystemsModules } from './entities/contracts-systems-modules.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ContractsSystemsModules])],
  controllers: [],
  providers: [ContractsSystemsModulesService],
  exports: [ContractsSystemsModulesService],
})
export class ContractsSystemsModulesModule {}
