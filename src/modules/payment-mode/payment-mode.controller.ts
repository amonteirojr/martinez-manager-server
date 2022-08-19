import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreatePaymentoModeDTO } from './dto/create-payment-mode.dto';
import { PaymentModeService } from './payment-mode.service';

@Controller('payment-mode')
export class PaymentModeController {
  constructor(private readonly paymentModeService: PaymentModeService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async getAll(@Res() res: Response) {
    const paymentModes = await this.paymentModeService.getAll();
    return res.send(paymentModes);
  }

  @Get('/:id')
  @UseGuards(JwtAuthGuard)
  async getById(@Res() res: Response, @Param('id') id: number) {
    const paymentMode = await this.paymentModeService.getById(id);
    return res.send(paymentMode);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Res() res: Response, @Body() dto: CreatePaymentoModeDTO) {
    const paymentMode = await this.paymentModeService.create(dto);
    return res.send(paymentMode);
  }

  @Patch('/:id')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  async update(
    @Res() res: Response,
    @Body() dto: CreatePaymentoModeDTO,
    @Param('id') id: number,
  ) {
    await this.paymentModeService.update(id, dto);
    return res.send();
  }

  @Delete('/:id')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Res() res: Response, @Param('id') id: number) {
    await this.paymentModeService.delete(id);
    return res.send();
  }
}
