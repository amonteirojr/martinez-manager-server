import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';

import { ApiCreatedResponse, ApiResponse } from '@nestjs/swagger';
import { Response } from 'express';
import { LocalAuthGuard } from '../auth/guards/local-auth.guard';
import { RoleEnum, Roles } from '../role/role.decorator';
import { CreateUserDTO } from './dto/create-user.dto';
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

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ type: User })
  async getUserById(@Res() res: Response, @Param('id') userId: number) {
    const user = await this.userService.getUserById(userId);
    return res.send(user);
  }
}
