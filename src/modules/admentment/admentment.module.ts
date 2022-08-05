import { Module } from '@nestjs/common';
import { AdmentmentService } from './admentment.service';
import { AdmentmentController } from './admentment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Admentment } from './entities/admentment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Admentment])],
  controllers: [AdmentmentController],
  providers: [AdmentmentService],
  exports: [AdmentmentService],
})
export class AdmentmentModule {}
