import { Injectable } from '@nestjs/common';
import { CreateBookingAdminDto, CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { ResponseService } from 'src/common/services/response.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Booking } from './entities/booking.entity';
import { Repository } from 'typeorm';
import { paginate, PaginateQuery } from 'nestjs-paginate';

@Injectable()
export class BookingsService {
  constructor(
    @InjectRepository(Booking)
    private readonly bookingRepository: Repository<Booking>,
    private response: ResponseService,
  ) { }
  async create(bookingData: CreateBookingDto, user_id: string) {
    bookingData.user_id = user_id;
    const booking = this.bookingRepository.create(bookingData);
    const savedBooking = await this.bookingRepository.save(booking);

    return this.response.successResponse('booking recorded', savedBooking);
  }

  async findAll(query: PaginateQuery) {
    return paginate(query, this.bookingRepository, {
      sortableColumns: ['id'],
      relations: ['shopRoom', 'shopService'],
      defaultSortBy: [['id', 'DESC']],
      searchableColumns: ['date'],
      filterableColumns: {},
    });
  }

  async findAllUser(query: PaginateQuery, user_id: string) {
    return paginate(query, this.bookingRepository, {
      sortableColumns: ['id'],
      relations: ['shopRoom', 'shopService'],
      defaultSortBy: [['id', 'DESC']],
      searchableColumns: ['date'],
      filterableColumns: {},
      where: {
        user_id,
      },
    });
  }

  async findOne(id: string): Promise<Booking | null> {
    return await this.bookingRepository.findOne({
      where: { id },
      relations: ['user', 'shopRoom'],
    });
  }

  async update(id: string, bookingData: Partial<Booking>): Promise<Booking> {
    await this.bookingRepository.update(id, bookingData);
    return this.findOne(id);
  }

  async delete(id: string): Promise<void> {
    await this.bookingRepository.softDelete(id);
  }

  async createBookingAdmin(bookingData: CreateBookingAdminDto, user_id: string) {
    const { shop_service_ids } = bookingData
    bookingData.user_id = user_id;
    const booking = this.bookingRepository.create(bookingData);
    const savedBooking = await this.bookingRepository.save(booking);

    return this.response.successResponse('booking recorded', savedBooking);
  }
}
