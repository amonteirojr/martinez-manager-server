import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PermissionService } from './permission.service';
import { Permission } from './entities/permission.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Permission])],
  providers: [PermissionService],
})
export class PermissionModule {}
