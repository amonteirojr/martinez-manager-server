import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiCreatedResponse } from '@nestjs/swagger';
import { Response } from 'express';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateSystemModuleDTO } from './dto/create-module.dto';
import { SystemModule } from './entities/system-module.entity';
import { SystemModuleService } from './system-module.service';

@Controller('system-module')
export class SystemModuleController {
  constructor(private readonly systemModuleService: SystemModuleService) {}

  @Post()
  @ApiCreatedResponse({ type: SystemModule })
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(JwtAuthGuard)
  async createSystemModule(
    @Res() res: Response,
    @Body() createSystemModuleDTO: CreateSystemModuleDTO,
  ) {
    const systemModule = await this.systemModuleService.createSystemModule(
      createSystemModuleDTO,
    );
    return res.send(systemModule);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  async getSystemModules(@Res() res: Response) {
    const systemModules = await this.systemModuleService.getSystemModules();
    return res.send(systemModules);
  }

  @Get('/table')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  async getSystemModulesTableData(@Res() res: Response) {
    const systemModules =
      await this.systemModuleService.getSystemModulesTableData();
    return res.send(systemModules);
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  async getSystemModuleById(
    @Res() res: Response,
    @Param('id') moduleId: number,
  ) {
    const systemModule = await this.systemModuleService.getSystemModuleById(
      moduleId,
    );
    return res.send(systemModule);
  }

  @Put('/:id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  async updateSystemModule(
    @Res() res: Response,
    @Body() createSystemModuleDTO: CreateSystemModuleDTO,
    @Param('id') moduleId: number,
  ) {
    const systemModule = await this.systemModuleService.updateSystemModule(
      createSystemModuleDTO,
      moduleId,
    );
    return res.send(systemModule);
  }
}
