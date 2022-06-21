import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CodeErrors } from 'src/shared/code-errors.enum';
import { Repository } from 'typeorm';
import { CreateRoleDTO } from './dto/create-role.dto';
import { Role } from './entities/role.entity';

@Injectable()
export class RoleService {
  private readonly logger = new Logger(RoleService.name);

  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}

  async createRole(createRoleDTO: CreateRoleDTO): Promise<Role> {
    try {
      const createdRole = this.roleRepository.create(createRoleDTO);

      return await this.roleRepository.save(createdRole);
    } catch (err) {
      this.logger.error(`Failed to create role. Cause: ${err}`);

      if (err.code === '23505') {
        throw new ConflictException({
          code: CodeErrors.ROLE_ALREADY_EXISTS,
          message: 'Role already exists',
        });
      }

      throw new InternalServerErrorException({
        code: CodeErrors.FAIL_TO_CREATE_ROLE,
        message: 'Failed to create the role',
      });
    }
  }
}
