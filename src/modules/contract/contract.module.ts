import { Module } from '@nestjs/common';
import { ContractService } from './contract.service';
import { ContractController } from './contract.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Contract } from './entitites/contract.entity';
import { SystemModule } from '../system/system.module';
import { AdmentmentModule } from '../admentment/admentment.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Contract]),
    SystemModule,
    AdmentmentModule,
  ],
  controllers: [ContractController],
  providers: [ContractService],
  exports: [ContractService],
})
export class ContractModule {}
