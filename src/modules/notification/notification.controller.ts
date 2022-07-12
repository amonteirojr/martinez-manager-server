import { Body, Controller, Post, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { SendEmailDTO } from './dto/send-email.dto';
import { NotificationService } from './notification.service';

@Controller('notification')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Post('email')
  @UseGuards(JwtAuthGuard)
  async sendEmail(@Body() sendEmailDTO: SendEmailDTO, @Res() res: Response) {
    const response = await this.notificationService.sendEmail(sendEmailDTO);
    return res.send(response);
  }
}
