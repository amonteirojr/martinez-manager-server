import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { BiddingModalityService } from './bidding-modality.service';
import { CreateBiddingModalityDto } from './dto/create-bidding-modality.dto';
import { UpdateBiddingModalityDto } from './dto/update-bidding-modality.dto';

@Controller('bidding-modality')
export class BiddingModalityController {
  constructor(
    private readonly biddingModalityService: BiddingModalityService,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() createBiddingModalityDto: CreateBiddingModalityDto) {
    return await this.biddingModalityService.create(createBiddingModalityDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll() {
    return await this.biddingModalityService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findOne(@Param('id') id: string) {
    return await this.biddingModalityService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  async update(
    @Param('id') id: string,
    @Body() updateBiddingModalityDto: UpdateBiddingModalityDto,
  ) {
    return await this.biddingModalityService.update(
      +id,
      updateBiddingModalityDto,
    );
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string) {
    return await this.biddingModalityService.remove(+id);
  }
}
