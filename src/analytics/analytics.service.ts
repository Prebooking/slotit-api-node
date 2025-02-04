import { Injectable } from '@nestjs/common';
import { CreateAnalyticsDto } from './dto/create-analytics.dto';
import { UpdateAnalyticsDto } from './dto/update-analytics.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Booking } from 'src/bookings/entities/booking.entity';
import { Repository } from 'typeorm';
import { ResponseService } from 'src/common/services/response.service';
import { GetBasicAnalyticsDto } from './dto/get-analytics.dto';

@Injectable()
export class AnalyticsService {
  constructor(
    @InjectRepository(Booking)
    private readonly bookingRepository: Repository<Booking>,
    private response: ResponseService,
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

  findOne(id: number) {
    return `This action returns a #${id} analytics`;
  }

  update(id: number, updateAnalyticsDto: UpdateAnalyticsDto) {
    return `This action updates a #${id} analytics`;
  }

  remove(id: number) {
    return `This action removes a #${id} analytics`;
  }
}
