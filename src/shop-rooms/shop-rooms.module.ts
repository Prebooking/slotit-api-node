import { Module } from '@nestjs/common';
import { ShopRoomsService } from './shop-rooms.service';
import { ShopRoomsController } from './shop-rooms.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonModule } from 'src/common/common.module';
import { ShopRoom } from './entities/shop-room.entity';
import { ShopsModule } from 'src/shops/shops.module';
import { RoleUserModule } from 'src/role-user/role-user.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ShopRoom]),
    CommonModule,
    UsersModule,
    ShopsModule,
    RoleUserModule,
  ],
  controllers: [ShopRoomsController],
  providers: [ShopRoomsService],
  exports: [ShopRoomsService],
})
export class ShopRoomsModule {}
