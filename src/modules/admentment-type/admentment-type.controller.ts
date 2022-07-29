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
import { ApiBody, ApiResponse } from '@nestjs/swagger';
import { Response } from 'express';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AdmentmentTypeService } from './admentment-type.service';
import { CreateAdmentmentTypeDTO } from './dto/create-admentment-type.dto';
import { AdmentmentType } from './entities/admentment-type.entity';

@Controller('admentment-type')
export class AdmentmentTypeController {
  constructor(private readonly admentmentTypeService: AdmentmentTypeService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  @ApiResponse({ type: Array<AdmentmentType> })
  async getAll(@Res() res: Response) {
    const type = await this.admentmentTypeService.getAllTypes();
    return res.send(type);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(JwtAuthGuard)
  @ApiResponse({ type: AdmentmentType })
  @ApiBody({ type: CreateAdmentmentTypeDTO })
  async createAdmentmentType(
    @Res() res: Response,
    @Body() createTypeDTO: CreateAdmentmentTypeDTO,
  ) {
    const type = await this.admentmentTypeService.createType(createTypeDTO);
    return res.send(type);
  }

  @Put('/:typeId')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  @ApiResponse({ type: AdmentmentType })
  @ApiBody({ type: CreateAdmentmentTypeDTO })
  async updateCustomerType(
    @Res() res: Response,
    @Body() createTypeDTO: CreateAdmentmentTypeDTO,
    @Param('typeId') typeId: number,
  ) {
    const type = await this.admentmentTypeService.updateType(
      createTypeDTO,
      typeId,
    );
    return res.send(type);
  }
}
