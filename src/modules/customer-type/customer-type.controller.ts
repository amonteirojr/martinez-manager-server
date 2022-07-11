import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { Response } from 'express';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CustomerTypeService } from './customer-type.service';
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
}
