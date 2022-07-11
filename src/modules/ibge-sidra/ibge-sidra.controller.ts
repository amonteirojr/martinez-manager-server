import { Controller } from '@nestjs/common';
import { IbgeSidraService } from './ibge-sidra.service';

@Controller('ibge-sidra')
export class IbgeSidraController {
  constructor(private readonly ibgeService: IbgeSidraService) {}
}
