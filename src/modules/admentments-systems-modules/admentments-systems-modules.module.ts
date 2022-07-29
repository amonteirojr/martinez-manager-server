import { Module } from '@nestjs/common';
import { AdmentmentsSystemsModulesService } from './admentments-systems-modules.service';
import { AdmentmentsSystemsModulesController } from './admentments-systems-modules.controller';

@Module({
  controllers: [AdmentmentsSystemsModulesController],
  providers: [AdmentmentsSystemsModulesService],
})
export class AdmentmentsSystemsModulesModule {}
