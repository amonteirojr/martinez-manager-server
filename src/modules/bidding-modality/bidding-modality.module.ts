import { Module } from '@nestjs/common';
import { BiddingModalityService } from './bidding-modality.service';
import { BiddingModalityController } from './bidding-modality.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BiddingModality } from './entities/bidding-modality.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BiddingModality])],
  controllers: [BiddingModalityController],
  providers: [BiddingModalityService],
})
export class BiddingModalityModule {}
