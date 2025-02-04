import { Injectable } from '@nestjs/common';
import { CreateTimeSlotDto } from './dto/create-time-slot.dto';
import { UpdateTimeSlotDto } from './dto/update-time-slot.dto';
import { paginate, PaginateQuery } from 'nestjs-paginate';
import { InjectRepository } from '@nestjs/typeorm';
import { TimeSlot } from './entities/time-slot.entity';
import { Repository } from 'typeorm';
import { BookingsService } from 'src/bookings/bookings.service';

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

  async findAllAdmin(query: PaginateQuery) {
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
