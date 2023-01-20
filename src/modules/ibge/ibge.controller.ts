import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Query,
  Res,
} from '@nestjs/common';
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

  @Get('/cities')
  @HttpCode(HttpStatus.OK)
  async getIbgeCities(@Res() res: Response, @Query('state') state: string) {
    const cities = await this.ibgeService.getCitiesByStateFromIbge(state);
    return res.send(cities);
  }
}
