import { Body, Controller, Post, Res } from '@nestjs/common';
import { Response } from 'express';

import { PasswordRecoveryDTO } from './dto/password-recovery.dto';
import { NotificationService } from './notification.service';

@Controller('notification')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Post('/email/password-recovery')
  async sendEmail(@Body() dto: PasswordRecoveryDTO, @Res() res: Response) {
    const response = await this.notificationService.sendPasswordRecoveryEmail(
      dto,
    );
    return res.send(response);
  }
}
