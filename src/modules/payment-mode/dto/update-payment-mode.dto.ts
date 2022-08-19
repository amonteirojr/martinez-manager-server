import { PartialType } from '@nestjs/mapped-types';
import { CreatePaymentoModeDTO } from './create-payment-mode.dto';

export class UpdatePaymentModeDTO extends PartialType(CreatePaymentoModeDTO) {}
