import { Module } from '@nestjs/common';
import { PaymentModeService } from './payment-mode.service';
import { PaymentModeController } from './payment-mode.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentMode } from './entities/payment-mode.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PaymentMode])],
  controllers: [PaymentModeController],
  providers: [PaymentModeService],
})
export class PaymentModeModule {}
