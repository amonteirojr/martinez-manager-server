import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CodeErrors } from 'src/shared/code-errors.enum';
import { Repository } from 'typeorm';
import { CreateTypeDTO } from './dto/create-type.dto';
import { CustomerType } from './entities/customer-type.entity';

@Injectable()
export class CustomerTypeService {
  private readonly logger = new Logger(CustomerTypeService.name);
  constructor(
    @InjectRepository(CustomerType)
    private readonly typeRepository: Repository<CustomerType>,
  ) {}

  async getAllTypes(): Promise<CustomerType[]> {
    try {
      return await this.typeRepository.find();
    } catch (err) {
      this.logger.error(`Failed to get customers types. Cause: ${err}`);

      throw new InternalServerErrorException({
        code: CodeErrors.FAIL_TO_GET_CUSTOMER_TYPES,
        message: `Failed to GET customers types`,
      });
    }
  }

  async createType(createTypeDTO: CreateTypeDTO): Promise<CustomerType> {
    try {
      return await this.typeRepository.create(createTypeDTO).save();
    } catch (err) {
      this.logger.error(`Failed to create customer type. Cause: ${err}`);

      throw new InternalServerErrorException({
        code: CodeErrors.FAIL_TO_CREATE_CUSTOMER_TYPE,
        message: `Failed to create customer type`,
      });
    }
  }

  async updateType(
    createTypeDTO: CreateTypeDTO,
    id: number,
  ): Promise<CustomerType> {
    try {
      const updated = await this.typeRepository.update(
        { typeId: id },
        createTypeDTO,
      );

      console.log(updated);
      return;
    } catch (err) {
      this.logger.error(`Failed to create customer type. Cause: ${err}`);

      throw new InternalServerErrorException({
        code: CodeErrors.FAIL_TO_CREATE_CUSTOMER_TYPE,
        message: `Failed to create customer type`,
      });
    }
  }
}
