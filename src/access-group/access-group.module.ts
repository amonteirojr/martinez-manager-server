import { Module } from '@nestjs/common';
import { AccessGroupService } from './access-group.service';

@Module({
  providers: [AccessGroupService],
})
export class AccessGroupModule {}
