import { Module } from '@nestjs/common';
import { AdmentmentTypeService } from './admentment-type.service';
import { AdmentmentTypeController } from './admentment-type.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdmentmentType } from './entities/admentment-type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AdmentmentType])],
  controllers: [AdmentmentTypeController],
  providers: [AdmentmentTypeService],
})
export class AdmentmentTypeModule {}
