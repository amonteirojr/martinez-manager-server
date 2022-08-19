import { Module } from '@nestjs/common';
import { LawService } from './law.service';
import { LawController } from './law.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Law } from './entities/law.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Law])],
  controllers: [LawController],
  providers: [LawService],
})
export class LawModule {}
