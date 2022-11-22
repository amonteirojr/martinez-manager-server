import { Module } from '@nestjs/common';
import { ContractsSystemsService } from './contracts-systems.service';
import { ContractsSystemsController } from './contracts-systems.controller';

@Module({
  controllers: [ContractsSystemsController],
  providers: [ContractsSystemsService],
})
export class ContractsSystemsModule {}
