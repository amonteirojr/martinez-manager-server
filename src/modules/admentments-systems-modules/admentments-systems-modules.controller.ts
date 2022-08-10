import { Controller } from '@nestjs/common';
import { AdmentmentsSystemsModulesService } from './admentments-systems-modules.service';

@Controller('admentments-systems-modules')
export class AdmentmentsSystemsModulesController {
  constructor(
    private readonly admentmentsSystemsModulesService: AdmentmentsSystemsModulesService,
  ) {}
}
