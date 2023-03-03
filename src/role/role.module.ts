import { Module } from '@nestjs/common';
import { RoleService } from './role.service';

@Module({
  imports: [],
  providers: [RoleService],
  exports: [RoleService],
})
export class RoleModule {}
