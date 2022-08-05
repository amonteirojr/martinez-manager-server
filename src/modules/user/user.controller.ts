import {
  Body,
  Controller,
  Get,
  Headers,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';

import { ApiCreatedResponse, ApiResponse } from '@nestjs/swagger';
import { Response } from 'express';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

import { CreateUserDTO } from './dto/create-user.dto';
import { ResetPasswordDTO } from './dto/reset-password.dto';
import { User } from './entities/user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiCreatedResponse({ type: User })
  @HttpCode(HttpStatus.CREATED)
  async createUser(@Res() res: Response, @Body() createUserDTO: CreateUserDTO) {
    const user = await this.userService.createUser(createUserDTO);
    return res.send(user);
  }

  @Post('/password/reset')
  @HttpCode(HttpStatus.OK)
  async resetPassword(
    @Res() res: Response,
    @Body() resetPasswordDTO: ResetPasswordDTO,
    @Headers('resetToken') resetToken: string,
  ) {
    await this.userService.resetPassword(resetPasswordDTO, resetToken);
    return res.send();
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  @ApiResponse({ type: User })
  async getUserById(@Res() res: Response, @Param('id') userId: number) {
    const user = await this.userService.getUserById(userId);
    return res.send(user);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  @ApiResponse({ type: Array<User> })
  async getAllUsers(@Res() res: Response) {
    const users = await this.userService.getAllUsers();
    return res.send(users);
  }
}
