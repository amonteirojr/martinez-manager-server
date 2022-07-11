import { Module } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerController } from './customer.controller';
import { Customer } from './entities/customer.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CityModule } from '../city/city.module';
import { IbgeModule } from '../ibge/ibge.module';
import { IbgeSidraModule } from '../ibge-sidra/ibge-sidra.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Customer]),
    CityModule,
    IbgeModule,
    IbgeSidraModule,
  ],
  controllers: [CustomerController],
  providers: [CustomerService],
})
export class CustomerModule {}
