import { Controller } from '@nestjs/common';
import { ContractsSystemsService } from './contracts-systems.service';

@Controller('contracts-systems')
export class ContractsSystemsController {
  constructor(
    private readonly contractsSystemsService: ContractsSystemsService,
  ) {}
}
