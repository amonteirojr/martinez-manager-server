import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CodeErrors } from 'src/shared/code-errors.enum';
import { Repository } from 'typeorm';
import { CreateAdmentmentTypeDTO } from './dto/create-admentment-type.dto';
import { AdmentmentType } from './entities/admentment-type.entity';

@Injectable()
export class AdmentmentTypeService {
  private readonly logger = new Logger(AdmentmentTypeService.name);
  constructor(
    @InjectRepository(AdmentmentType)
    private readonly typeRepository: Repository<AdmentmentType>,
  ) {}

  async getAllTypes(): Promise<AdmentmentType[]> {
    try {
      return await this.typeRepository.find();
    } catch (err) {
      this.logger.error(`Failed to get admentment types. Cause: ${err}`);

      throw new InternalServerErrorException({
        code: CodeErrors.FAIL_TO_GET_ADMENTMENT_TYPE,
        message: `Failed to GET admentment types`,
      });
    }
  }

  async createType(
    createTypeDTO: CreateAdmentmentTypeDTO,
  ): Promise<AdmentmentType> {
    try {
      return await this.typeRepository.create(createTypeDTO).save();
    } catch (err) {
      this.logger.error(`Failed to create admentment type. Cause: ${err}`);

      throw new InternalServerErrorException({
        code: CodeErrors.FAIL_TO_CREATE_ADMENTMENT_TYPE,
        message: `Failed to create admentment type`,
      });
    }
  }

  async updateType(
    createTypeDTO: CreateAdmentmentTypeDTO,
    id: number,
  ): Promise<AdmentmentType> {
    try {
      await this.typeRepository.update({ admentmentTypeId: id }, createTypeDTO);
      return { admentmentTypeId: id } as AdmentmentType;
    } catch (err) {
      this.logger.error(`Failed to update admentment type. Cause: ${err}`);

      throw new InternalServerErrorException({
        code: CodeErrors.FAIL_TO_UPDATE_ADMENTMENT_TYPE,
        message: `Failed to update admentment type`,
      });
    }
  }
}
