import { Module } from '@nestjs/common';
import { AdmentmentsSystemsModulesService } from './admentments-systems-modules.service';
import { AdmentmentsSystemsModulesController } from './admentments-systems-modules.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdmentmentsSystemsModules } from './entities/admentments-systems-modules.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AdmentmentsSystemsModules])],
  controllers: [AdmentmentsSystemsModulesController],
  providers: [AdmentmentsSystemsModulesService],
})
export class AdmentmentsSystemsModulesModule {}
