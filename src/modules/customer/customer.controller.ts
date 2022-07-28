import {
  Body,
  Controller,
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
import { ApiCreatedResponse } from '@nestjs/swagger';
import { Response } from 'express';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CustomerService } from './customer.service';
import { CreateCustomerDTO } from './dto/create-customer.dto';
import { Customer } from './entities/customer.entity';

@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Post()
  @ApiCreatedResponse({ type: Customer })
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(JwtAuthGuard)
  async createCustomer(
    @Res() res: Response,
    @Body() createCustomer: CreateCustomerDTO,
  ) {
    const customer = await this.customerService.createCustomer(createCustomer);
    return res.send(customer);
  }

  @Put('/:customerId')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  async updateCustomer(
    @Res() res: Response,
    @Body() createCustomer: CreateCustomerDTO,
    @Param('customerId') customerId: number,
  ) {
    await this.customerService.updateCustomer(customerId, createCustomer);
    return res.send();
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  async getCustomerList(@Res() res: Response) {
    const result = await this.customerService.getAllCustomers();

    return res.send(result);
  }
}
