import { Module } from '@nestjs/common';
import { CustomerTypeService } from './customer-type.service';
import { CustomerTypeController } from './customer-type.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerType } from './entities/customer-type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CustomerType])],
  controllers: [CustomerTypeController],
  providers: [CustomerTypeService],
})
export class CustomerTypeModule {}
