import { Module } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';
import { AnalyticsController } from './analytics.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonModule } from 'src/common/common.module';
import { Booking } from 'src/bookings/entities/booking.entity';
import { ShopRoomsModule } from 'src/shop-rooms/shop-rooms.module';

@Module({
  imports: [TypeOrmModule.forFeature([Booking]), CommonModule, ShopRoomsModule],
  controllers: [AnalyticsController],
  providers: [AnalyticsService],
})
export class AnalyticsModule {}
