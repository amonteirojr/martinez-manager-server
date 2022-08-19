import { PartialType } from '@nestjs/swagger';
import { CreateBiddingModalityDto } from './create-bidding-modality.dto';

export class UpdateBiddingModalityDto extends PartialType(
  CreateBiddingModalityDto,
) {}
