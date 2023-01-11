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
import { randomUUID } from 'crypto';
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
  @HttpCode(HttpStatus.NO_CONTENT)
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
  @UseGuards(JwtAuthGuard)
  async getCustomerList(@Res() res: Response) {
    const result = await this.customerService.getAllCustomers();

    return res.send(result);
  }

  @Get('/:id')
  @UseGuards(JwtAuthGuard)
  async getCustomer(@Res() res: Response, @Param('id') customerId: number) {
    const result = await this.customerService.getCustomer(customerId);
    return res.send(result);
  }

  @Get('/list/report')
  @HttpCode(HttpStatus.OK)
  async getCustomerListReport(@Res() res: Response) {
    const file = await this.customerService.printCustomerList();
    const filename = `${randomUUID()}.pdf`;
    res.contentType('application/pdf');
    res.setHeader('Filename', filename);
    return res.send(file);
  }
}
