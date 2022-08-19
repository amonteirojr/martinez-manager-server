import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CodeErrors } from 'src/shared/code-errors.enum';
import { Repository } from 'typeorm';
import { CreatePaymentoModeDTO } from './dto/create-payment-mode.dto';
import { UpdatePaymentModeDTO } from './dto/update-payment-mode.dto';
import { PaymentMode } from './entities/payment-mode.entity';

@Injectable()
export class PaymentModeService {
  private readonly logger = new Logger(PaymentModeService.name);
  constructor(
    @InjectRepository(PaymentMode)
    private readonly paymentModeRepository: Repository<PaymentMode>,
  ) {}

  async getAll(): Promise<PaymentMode[]> {
    try {
      return await this.paymentModeRepository.find({
        order: {
          paymentModeId: 'ASC',
        },
      });
    } catch (err) {
      this.logger.error(`Failed to get all payment modes. Cause: ${err}`);

      throw new InternalServerErrorException({
        code: CodeErrors.FAIL_TO_GET_ALL_PAYMENT_MODES,
        message: 'Failed to get all payment modes',
      });
    }
  }

  async getById(id: number): Promise<PaymentMode> {
    try {
      return await this.paymentModeRepository.findOne({
        where: { paymentModeId: id },
      });
    } catch (err) {
      this.logger.error(`Failed to get payment mode ${id}. Cause: ${err}`);

      throw new InternalServerErrorException({
        code: CodeErrors.FAIL_TO_GET_PAYMENT_MODE,
        message: 'Failed to get payment mode',
      });
    }
  }

  async create(dto: CreatePaymentoModeDTO): Promise<PaymentMode> {
    try {
      return await this.paymentModeRepository.create(dto).save();
    } catch (err) {
      this.logger.error(`Failed to create payment mode. Cause: ${err}`);

      throw new InternalServerErrorException({
        code: CodeErrors.FAIL_TO_CREATE_PAYMENT_MODE,
        message: 'Failed to create payment mode',
      });
    }
  }

  async update(id: number, dto: UpdatePaymentModeDTO): Promise<void> {
    try {
      await this.paymentModeRepository.update({ paymentModeId: id }, dto);
    } catch (err) {
      this.logger.error(`Failed to update payment mode. Cause: ${err}`);

      throw new InternalServerErrorException({
        code: CodeErrors.FAIL_TO_UPDATE_PAYMENT_MODE,
        message: 'Failed to update payment mode',
      });
    }
  }

  async delete(id: number): Promise<void> {
    try {
      await this.paymentModeRepository.delete({ paymentModeId: id });
    } catch (err) {
      this.logger.error(`Failed to delete payment mode. Cause: ${err}`);

      throw new InternalServerErrorException({
        code: CodeErrors.FAIL_TO_DELETE_PAYMENT_MODE,
        message: 'Failed to delete payment mode',
      });
    }
  }
}
