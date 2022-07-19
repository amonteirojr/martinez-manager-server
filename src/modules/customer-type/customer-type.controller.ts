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
import { CustomerTypeService } from './customer-type.service';
import { CreateTypeDTO } from './dto/create-type.dto';
import { CustomerType } from './entities/customer-type.entity';

@Controller('customer-type')
export class CustomerTypeController {
  constructor(private readonly customerTypeService: CustomerTypeService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  @ApiResponse({ type: Array<CustomerType> })
  async getAllCustomerTypes(@Res() res: Response) {
    const type = await this.customerTypeService.getAllTypes();
    return res.send(type);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(JwtAuthGuard)
  @ApiResponse({ type: CustomerType })
  @ApiBody({ type: CreateTypeDTO })
  async createCustomerType(
    @Res() res: Response,
    @Body() createTypeDTO: CreateTypeDTO,
  ) {
    const type = await this.customerTypeService.createType(createTypeDTO);
    return res.send(type);
  }

  @Put('/:typeId')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  @ApiResponse({ type: CustomerType })
  @ApiBody({ type: CreateTypeDTO })
  async updateCustomerType(
    @Res() res: Response,
    @Body() createTypeDTO: CreateTypeDTO,
    @Param('typeId') typeId: number,
  ) {
    const type = await this.customerTypeService.updateType(
      createTypeDTO,
      typeId,
    );
    return res.send(type);
  }
}
