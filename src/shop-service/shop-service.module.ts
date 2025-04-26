import { Module } from '@nestjs/common';
import { ShopServiceService } from './shop-service.service';
import { ShopServiceController } from './shop-service.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShopService } from './entities/shop-service.entity';
import { CommonModule } from 'src/common/common.module';
import { ShopsModule } from 'src/shops/shops.module';
import { ServicesModule } from 'src/services/services.module';
import { ShopRoomsModule } from 'src/shop-rooms/shop-rooms.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ShopService]),
    ShopRoomsModule,
    CommonModule,
    ShopsModule,
    ServicesModule,
  ],
  controllers: [ShopServiceController],
  providers: [ShopServiceService],
  exports: [ShopServiceService],
})
export class ShopServiceModule {}
