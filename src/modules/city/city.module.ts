import { Module } from '@nestjs/common';
import { CityService } from './city.service';
import { CityController } from './city.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { City } from './entities/city.entity';
import { IbgeModule } from '../ibge/ibge.module';
import { IbgeSidraModule } from '../ibge-sidra/ibge-sidra.module';

@Module({
  imports: [TypeOrmModule.forFeature([City]), IbgeModule, IbgeSidraModule],
  controllers: [CityController],
  providers: [CityService],
  exports: [CityService],
})
export class CityModule {}
