import {
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  @HttpCode(HttpStatus.OK)
  async login(@Req() req: Request, @Res() res: Response) {
    const user = await this.authService.login(req.user);
    if (user.refresh_token) {
      res.setHeader('refresh_token', user.refresh_token);
      delete user.refresh_token;
    }
    return res.send(user);
  }
}
