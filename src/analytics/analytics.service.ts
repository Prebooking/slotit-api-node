import { Injectable } from '@nestjs/common';
import { CreateAnalyticsDto } from './dto/create-analytics.dto';
import { UpdateAnalyticsDto } from './dto/update-analytics.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Booking } from 'src/bookings/entities/booking.entity';
import { Repository } from 'typeorm';
import { ResponseService } from 'src/common/services/response.service';
import {
  GetBasicAnalyticsDto,
  GetRoomAnalyticsDto,
} from './dto/get-analytics.dto';
import { ShopRoom } from 'src/shop-rooms/entities/shop-room.entity';
import { ShopRoomsService } from 'src/shop-rooms/shop-rooms.service';
import { ShopService } from 'src/shop-service/entities/shop-service.entity';
import { ShopServiceService } from 'src/shop-service/shop-service.service';

@Injectable()
export class AnalyticsService {
  constructor(
    @InjectRepository(Booking)
    private readonly bookingRepository: Repository<Booking>,
    private shopServiceService: ShopServiceService,

    private response: ResponseService,
    private shopRoomService: ShopRoomsService,
  ) {}
  create(createAnalyticsDto: CreateAnalyticsDto) {}

  async basicAnalytics(filter: GetBasicAnalyticsDto) {
    const { shop_id, shop_room_id, to_date, from_date } = filter;
    const queryBuilder = this.bookingRepository
      .createQueryBuilder('booking')
      .select([
        'COUNT(booking.id) AS totalBookings',
        'SUM(booking.amount) AS totalAmount',
      ])
      .innerJoin('booking.shopRoom', 'shopRoom') // Assuming relation name is "shopRoom"
      .where('booking.date BETWEEN :from_date AND :to_date', {
        from_date,
        to_date,
      });

    if (shop_room_id) {
      queryBuilder.andWhere('booking.shop_room_id = :shop_room_id', {
        shop_room_id,
      });
    }

    if (shop_id) {
      queryBuilder.andWhere('shopRoom.shop_id = :shop_id', { shop_id });
    }

    const data = await queryBuilder.getRawOne();
    data.totalClient = data.totalBookings;
    return this.response.successResponse('basic analytics', data);
  }

  async roomAnalytics(shop_id: string, filter: GetRoomAnalyticsDto) {
    const { from_date, to_date } = filter;

    // Use current date if no from_date or to_date is provided
    const currentDate = new Date().toISOString().split('T')[0]; // Format as YYYY-MM-DD

    const query = this.bookingRepository
      .createQueryBuilder('b')
      .select('sr.id', 'shop_room_id')
      .addSelect('sr.name', 'shop_room_name')
      .addSelect('SUM(b.amount)', 'total_amount')
      .addSelect('SUM(b.services_count)', 'total_services_count')
      .innerJoin('b.shopRoom', 'sr', 'b.shop_room_id = sr.id')
      .where('sr.shop_id = :shop_id', { shop_id });

    // Apply date filters if they exist, otherwise use the current date
    if (from_date && to_date) {
      query.andWhere('b.date BETWEEN :from_date AND :to_date', {
        from_date,
        to_date,
      });
    } else {
      query.andWhere('b.date BETWEEN :from_date AND :to_date', {
        from_date: currentDate,
        to_date: currentDate,
      });
    }

    const result = await query.groupBy('sr.id, sr.name').getRawMany();

    // Fetch all shop rooms
    const allRooms = await this.shopRoomService.findOneByShopId(shop_id);

    // Merge all rooms with the result data, setting the total values to 0 if no data is found for the room
    const analytics = allRooms.map((room) => {
      const roomData = result.find((r) => r.shop_room_id === room.id);
      return {
        shop_room_name: room.name,
        total_amount: roomData ? roomData.total_amount : 0,
        total_services_count: roomData ? roomData.total_services_count : 0,
      };
    });

    return this.response.successResponse('room analytics', analytics);
  }

  async shopServiceAnalytics(shop_id: string, filter: GetRoomAnalyticsDto) {
    const analytics = await this.shopServiceService.shopServiceAnalytics(
      shop_id,
      filter,
    );
    return this.response.successResponse('room analytics', analytics);
  }

  async mostBookedServicesAnalytics(
    shop_id: string,
    filter: GetRoomAnalyticsDto,
  ) {
    const analytics = await this.shopServiceService.mostBookedServicesAnalytics(
      shop_id,
      filter,
    );
    return this.response.successResponse('room analytics', analytics);
  }
}
