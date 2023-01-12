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
  Query,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { randomUUID } from 'crypto';
import { Response } from 'express';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AdmentmentService } from './admentment.service';
import { AdmentmentFiltersDTO } from './dto/admentment-filters.dto';
import { CreateAdmentmentDTO } from './dto/create-admentment.dto';
import { Admentment } from './entities/admentment.entity';

@Controller('admentment')
export class AdmentmentController {
  constructor(private readonly admentmentService: AdmentmentService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(JwtAuthGuard)
  @ApiResponse({ type: Admentment })
  async create(@Res() res: Response, @Body() dto: CreateAdmentmentDTO) {
    const admentment = await this.admentmentService.createAdmentment(dto);
    return res.send(admentment);
  }

  @Put('/:id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  @ApiResponse({ type: Admentment })
  async update(
    @Res() res: Response,
    @Body() dto: CreateAdmentmentDTO,
    @Param('id') id: number,
  ) {
    const admentment = await this.admentmentService.updateAdmentmentById(
      id,
      dto,
    );
    return res.send(admentment);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiResponse({ type: Array<Admentment> })
  async get(@Res() res: Response, @Query() filter: AdmentmentFiltersDTO) {
    const admentments = await this.admentmentService.getAll(filter);
    return res.send(admentments);
  }

  @Get('/:id')
  @UseGuards(JwtAuthGuard)
  @ApiResponse({ type: Array<Admentment> })
  async getById(@Res() res: Response, @Param('id') id: number) {
    const admentments = await this.admentmentService.getById(id);
    return res.send(admentments);
  }

  @Delete('/:id')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiResponse({ type: Array<Admentment> })
  async deleteById(@Res() res: Response, @Param('id') id: number) {
    await this.admentmentService.deleteById(id);
    return res.send();
  }

  @Get('/list/report')
  @HttpCode(HttpStatus.OK)
  async getAdmentmentList(
    @Res() res: Response,
    @Query() filters?: AdmentmentFiltersDTO,
  ) {
    const file = await this.admentmentService.printAdmentmentList(filters);
    const filename = `${randomUUID()}.pdf`;
    res.contentType('application/pdf');
    res.setHeader('Filename', filename);
    return res.send(file);
  }
}
