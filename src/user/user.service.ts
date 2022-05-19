import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UserRepository } from './repositories/user.repository';

import * as bcrypt from 'bcrypt';
import { CodeErrors } from 'src/shared/code-errors.enum';
import { Role } from 'src/role/entities/role.entity';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(private readonly userRepository: UserRepository) {}

  async createUser(createUserDTO: CreateUserDTO): Promise<User> {
    try {
      const userDto = {
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

      throw new InternalServerErrorException({
        code: CodeErrors.FAIL_TO_CREATE_USER,
        message: 'Failed to create the user',
      });
    }
  }

  async findOneByEmail(email: string): Promise<User> {
    try {
      const user = await this.userRepository.findOne(
        { email },
        { relations: ['roles'] },
      );

      return user;
    } catch (err) {
      this.logger.error(`Failed to find user by email. Cause: ${err}`);

      throw new InternalServerErrorException({
        code: CodeErrors.FAIL_TO_FIND_USER,
        message: 'Failed to find user by email',
      });
    }
  }
}
