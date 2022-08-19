import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CodeErrors } from 'src/shared/code-errors.enum';
import { Repository } from 'typeorm';
import { CreateBiddingModalityDto } from './dto/create-bidding-modality.dto';
import { UpdateBiddingModalityDto } from './dto/update-bidding-modality.dto';
import { BiddingModality } from './entities/bidding-modality.entity';

@Injectable()
export class BiddingModalityService {
  private readonly logger = new Logger(BiddingModalityService.name);
  constructor(
    @InjectRepository(BiddingModality)
    private readonly biddingModalityRepository: Repository<BiddingModality>,
  ) {}

  async create(
    createBiddingModalityDto: CreateBiddingModalityDto,
  ): Promise<BiddingModality> {
    try {
      return await this.biddingModalityRepository
        .create(createBiddingModalityDto)
        .save();
    } catch (err) {
      this.logger.error(`Failed to create BIDDING MODALITY. Cause: ${err}`);

      throw new InternalServerErrorException({
        code: CodeErrors.FAIL_TO_CREATE_BIDDING_MODALITY,
        message: 'Failed to create BIDDING MODALITY',
      });
    }
  }

  async findAll(): Promise<BiddingModality[]> {
    try {
      return await this.biddingModalityRepository.find();
    } catch (err) {
      this.logger.error(`Failed to get all BIDDING MODALITIES. Cause: ${err}`);

      throw new InternalServerErrorException({
        code: CodeErrors.FAIL_TO_GET_ALL_BIDDING_MODALITIES,
        message: 'Failed to get all BIDDING MODALITIES',
      });
    }
  }

  async findOne(id: number): Promise<BiddingModality> {
    try {
      return await this.biddingModalityRepository.findOne({
        where: { biddingModalityId: id },
      });
    } catch (err) {
      this.logger.error(`Failed to get bidding modality. Cause: ${err}`);

      throw new InternalServerErrorException({
        code: CodeErrors.FAIL_TO_GET_BIDDING_MODALITY,
        message: 'Failed to get bidding modality',
      });
    }
  }

  async update(
    id: number,
    updateBiddingModalityDto: UpdateBiddingModalityDto,
  ): Promise<void> {
    try {
      await this.biddingModalityRepository.update(
        { biddingModalityId: id },
        updateBiddingModalityDto,
      );
    } catch (err) {
      this.logger.error(`Failed to update BIDDING MODALITY. Cause: ${err}`);

      throw new InternalServerErrorException({
        code: CodeErrors.FAIL_TO_UPDATE_BIDDING_MODALITY,
        message: 'Failed to update BIDDING MODALITY',
      });
    }
  }

  async remove(id: number) {
    try {
      await this.biddingModalityRepository.delete({ biddingModalityId: id });
    } catch (err) {
      this.logger.error(`Failed to delete BIDDING MODALITY. Cause: ${err}`);

      throw new InternalServerErrorException({
        code: CodeErrors.FAIL_TO_DELETE_BIDDING_MODALITY,
        message: 'Failed to delete BIDDING MODALITY',
      });
    }
  }
}
