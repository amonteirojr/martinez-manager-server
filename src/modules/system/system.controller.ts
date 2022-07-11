import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiResponse } from '@nestjs/swagger';
import { Response } from 'express';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateOrUpdateSystemDTO } from './dto/create-or-update.system.dto';

import { System } from './entities/system.entity';
import { SystemService } from './system.service';

@Controller('system')
export class SystemController {
  constructor(private readonly systemService: SystemService) {}

  @Post()
  @ApiCreatedResponse({ type: System })
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(JwtAuthGuard)
  async createSystem(
    @Res() res: Response,
    @Body() createSystemDTO: CreateOrUpdateSystemDTO,
  ) {
    const system = await this.systemService.createSystem(createSystemDTO);
    return res.send(system);
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  @ApiResponse({ type: System })
  async getUserById(@Res() res: Response, @Param('id') systemId: number) {
    const system = await this.systemService.getSystemById(systemId);
    return res.send(system);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  @ApiResponse({ type: Array<System> })
  async getAll(@Res() res: Response) {
    const systems = await this.systemService.getAllSystems();
    return res.send(systems);
  }

  @Put('/:id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  async updateSystemById(
    @Res() res: Response,
    @Param('id') systemId: number,
    @Body() updateSystemDTO: CreateOrUpdateSystemDTO,
  ) {
    await this.systemService.updateSystemById(systemId, updateSystemDTO);
    return res.status(HttpStatus.NO_CONTENT).send();
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(JwtAuthGuard)
  async deleteSystemById(@Res() res: Response, @Param('id') systemId: number) {
    await this.systemService.deleteSystemById(systemId);
    return res.status(HttpStatus.NO_CONTENT).send();
  }
}
