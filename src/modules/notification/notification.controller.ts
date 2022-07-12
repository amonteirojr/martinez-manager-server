import { Body, Controller, Post, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { PasswordRecoveryDTO } from './dto/password-recovery.dto';
import { NotificationService } from './notification.service';

@Controller('notification')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Post('/email/password-recovery')
  @UseGuards(JwtAuthGuard)
  async sendEmail(@Body() dto: PasswordRecoveryDTO, @Res() res: Response) {
    const response = await this.notificationService.sendPasswordRecoveryEmail(
      dto,
    );
    return res.send(response);
  }
}
