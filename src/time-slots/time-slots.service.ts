import { Injectable } from '@nestjs/common';
import { CreateTimeSlotDto } from './dto/create-time-slot.dto';
import { UpdateTimeSlotDto } from './dto/update-time-slot.dto';
import { paginate, PaginateQuery } from 'nestjs-paginate';
import { InjectRepository } from '@nestjs/typeorm';
import { TimeSlot } from './entities/time-slot.entity';
import { Between, In, IsNull, Not, Repository } from 'typeorm';
import { BookingsService } from 'src/bookings/bookings.service';
import { GetTimeSlotDto } from './dto/get-time-slots.dto';
import { ShopService } from 'src/shop-service/entities/shop-service.entity';

@Injectable()
export class TimeSlotsService {
  constructor(
    @InjectRepository(TimeSlot)
    private timeSlotRepository: Repository<TimeSlot>,
    private bookingService: BookingsService,
  ) {}
  create(createTimeSlotDto: CreateTimeSlotDto) {
    return 'This action adds a new timeSlot';
  }

  async findAll(query: PaginateQuery) {
    const data = await paginate(query, this.timeSlotRepository, {
      sortableColumns: ['id'],
      defaultSortBy: [['time_from', 'ASC']],
      searchableColumns: [],
      filterableColumns: {},
    });
    const updatedData = await Promise.all(
      data.data.map(async (item) => {
        const is_available = true;

        return {
          ...item,
          is_available,
        };
      }),
    );
    return updatedData;
  }

  async findAllAdmin(query: PaginateQuery, filter: Record<string, any>) {
    let bookings;

    if (filter) {
      const { date, shop_room_id, shop_service_ids } = filter;
      let params: { [key: string]: any } = {}; // Ensure params is always an object

      if (date) params.date = date;
      if (shop_room_id) params.shop_room_id = shop_room_id;
      // if (shop_service_ids && typeof shop_service_ids === 'string') {
      //   params.shopServices = {
      //     id: In(shop_service_ids.split(',').map((id) => id.trim())), // Ensure trimming for clean IDs
      //   };
      // }
      bookings = await this.bookingService.findByParam(params);
    }
    let where = { id: Not(IsNull()) };
    if (filter.time_from && filter.time_to) {
      where['time_from'] = Between(filter.time_from, filter.time_to);
    }
    const data = await paginate(query, this.timeSlotRepository, {
      sortableColumns: ['id'],
      defaultSortBy: [['time_from', 'ASC']],
      searchableColumns: [],
      filterableColumns: {},
      select: ['id', 'time_from'],
      where,
    });

    // Add is_available field
    const updatedData = await Promise.all(
      data.data.map(async (item) => {
        const is_available = !bookings.some(
          (booking) =>
            item.time_from >= booking.time_from &&
            item.time_from < booking.time_to,
        );
        return { ...item, is_available };
      }),
    );

    data.data = updatedData;
    return data;
  }
  findOne(id: number) {
    return `This action returns a #${id} timeSlot `;
  }

  update(id: number, updateTimeSlotDto: UpdateTimeSlotDto) {
    return `This action updates a #${id} timeSlot`;
  }

  remove(id: number) {
    return `This action removes a #${id} timeSlot`;
  }
}
