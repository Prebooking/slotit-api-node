import { Module } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { BookingsController } from './bookings.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Booking } from './entities/booking.entity';
import { CommonModule } from 'src/common/common.module';
import { ShopServiceModule } from 'src/shop-service/shop-service.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Booking]),
    CommonModule,
    ShopServiceModule,
  ],
  controllers: [BookingsController],
  providers: [BookingsService],
  exports: [BookingsService],
})
export class BookingsModule {}
