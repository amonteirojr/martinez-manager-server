import { Controller, Get, HttpCode, HttpStatus, Res } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { Response } from 'express';
import { IbgeStatesResponseDTO } from './dto/ibge-states-response.dto';

import { IbgeService } from './ibge.service';

@Controller('ibge')
export class IbgeController {
  constructor(private readonly ibgeService: IbgeService) {}

  @Get('/states')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ type: IbgeStatesResponseDTO })
  async getStates(@Res() res: Response) {
    const states = await this.ibgeService.getAllStates();
    return res.send(states);
  }
}
