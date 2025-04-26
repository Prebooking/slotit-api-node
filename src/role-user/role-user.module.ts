import { Module } from '@nestjs/common';
import { RoleUserService } from './role-user.service';
import { RoleUserController } from './role-user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleUser } from './entities/role-user.entity';
import { CommonModule } from 'src/common/common.module';
import { RolesModule } from 'src/roles/roles.module';

@Module({
  imports: [TypeOrmModule.forFeature([RoleUser]), CommonModule, RolesModule],
  controllers: [RoleUserController],
  providers: [RoleUserService],
  exports: [RoleUserService],
})
export class RoleUserModule {}
