import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { User } from './entities/user.entity';

import * as bcrypt from 'bcrypt';
import { CodeErrors } from 'src/shared/code-errors.enum';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleService } from '../role/role.service';
import { ResetPasswordDTO } from './dto/reset-password.dto';
import { JwtService } from '@nestjs/jwt';
import { ResetTokenType } from 'src/types';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly roleService: RoleService,
    private readonly jwtService: JwtService,
  ) {}

  async createUser(createUserDTO: CreateUserDTO): Promise<User> {
    try {
      const role = await this.roleService.findRoleByName(createUserDTO.role);

      if (!role)
        throw new BadRequestException({
          code: CodeErrors.FAIL_TO_FIND_ROLE,
          message: 'Role is invalid or doesnt exist',
        });

      const userDto = {
        role,
        email: createUserDTO.email,
        password: bcrypt.hashSync(createUserDTO.password, 8),
        firstname: createUserDTO.firstname,
        lastname: createUserDTO.lastname,
      };

      const createdUser = this.userRepository.create(userDto);

      const { userId, firstname, lastname, email } =
        await this.userRepository.save(createdUser);

      return { userId, firstname, lastname, email } as User;
    } catch (err) {
      this.logger.error(`Failed to create user. Cause: ${err}`);

      if (err.code === '23505') {
        throw new ConflictException({
          code: CodeErrors.USER_ALREADY_EXISTS,
          message: 'User already exists',
        });
      }

      if (err instanceof BadRequestException) {
        throw err;
      }

      throw new InternalServerErrorException({
        code: CodeErrors.FAIL_TO_CREATE_USER,
        message: 'Failed to create the user',
      });
    }
  }

  async resetPassword(
    resetPasswordDTO: ResetPasswordDTO,
    resetToken: string,
  ): Promise<void> {
    try {
      if (!resetToken) {
        this.logger.error('resetToken is required');

        throw new BadRequestException({
          message: 'resetToken is invalid or null',
          code: CodeErrors.RESET_TOKEN_IS_INVALID,
        });
      }

      const userData: ResetTokenType = this.jwtService.decode(
        resetToken,
      ) as ResetTokenType;

      await this.userRepository.update(
        { email: userData.email, active: true },
        {
          password: bcrypt.hashSync(resetPasswordDTO.newPassword, 8),
        },
      );

      return;
    } catch (err) {
      this.logger.error(`Failed to reset user password. Cause: ${err}`);

      throw new InternalServerErrorException({
        code: CodeErrors.FAIL_TO_RESET_PASSWORD,
        message: 'Failed to reset user password',
      });
    }
  }

  async findByEmailForLogin(email: string): Promise<User> {
    try {
      const user = await this.userRepository.findOne({
        where: { email, active: true },
        relations: {
          role: true,
        },
      });

      return user;
    } catch (err) {
      this.logger.error(`Failed to find user by email. Cause: ${err}`);

      throw new InternalServerErrorException({
        code: CodeErrors.FAIL_TO_FIND_USER,
        message: 'Failed to find user by email for login',
      });
    }
  }

  async findOneByEmail(email: string): Promise<User> {
    try {
      const user = await this.userRepository.findOne({
        select: {
          userId: true,
          active: true,
          email: true,
          firstname: true,
          lastname: true,
          role: {
            name: true,
          },
        },
        where: { email },
        relations: {
          role: true,
        },
      });

      return user;
    } catch (err) {
      this.logger.error(`Failed to find user by email. Cause: ${err}`);

      throw new InternalServerErrorException({
        code: CodeErrors.FAIL_TO_FIND_USER,
        message: 'Failed to find user by email',
      });
    }
  }

  async getUserById(id: number): Promise<User> {
    try {
      const user = await this.userRepository.findOne({
        where: { userId: id },
        relations: ['role'],
      });

      return user;
    } catch (err) {
      this.logger.error(`Failed to find user by ID. Cause: ${err}`);

      throw new InternalServerErrorException({
        code: CodeErrors.FAIL_TO_FIND_USER,
        message: 'Failed to find user by ID',
      });
    }
  }
}
