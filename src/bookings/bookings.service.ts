import { Injectable, NotFoundException } from '@nestjs/common';
import {
  CreateBookingAdminDto,
  CreateBookingDto,
  updateBookingStatus,
} from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { ResponseService } from 'src/common/services/response.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Booking } from './entities/booking.entity';
import { Repository } from 'typeorm';
import {
  FilterOperator,
  FilterSuffix,
  paginate,
  PaginateQuery,
} from 'nestjs-paginate';
import { ShopServiceService } from 'src/shop-service/shop-service.service';

@Injectable()
export class BookingsService {
  constructor(
    @InjectRepository(Booking)
    private readonly bookingRepository: Repository<Booking>,
    private response: ResponseService,
    private shopServiceService: ShopServiceService,
  ) {}
  async create(bookingData: CreateBookingDto, user_id: string) {
    bookingData.user_id = user_id;
    const booking = this.bookingRepository.create(bookingData);
    const savedBooking = await this.bookingRepository.save(booking);

    return this.response.successResponse('booking recorded', savedBooking);
  }

  async findAll(query: PaginateQuery) {
    return paginate(query, this.bookingRepository, {
      sortableColumns: ['id'],
      relations: ['shopRoom', 'shopServices'],
      defaultSortBy: [['id', 'DESC']],
      searchableColumns: ['date'],
      filterableColumns: {
        shop_room_id: [FilterOperator.EQ, FilterSuffix.NOT],
        date: [FilterOperator.EQ, FilterSuffix.NOT],
        status: [FilterOperator.EQ, FilterSuffix.NOT],
      },
    });
  }

  async findAllUser(query: PaginateQuery, user_id: string) {
    return paginate(query, this.bookingRepository, {
      sortableColumns: ['id'],
      relations: ['shopRoom', 'shopServices'],
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

  async createBookingAdmin(
    bookingData: CreateBookingAdminDto,
    user_id: string,
  ) {
    const { shop_service_ids, amount } = bookingData;

    const services = await this.shopServiceService.findByIds(shop_service_ids);
    const totalCharge = services.reduce(
      (sum, service) => sum + Number(service.charge),
      0,
    );

    bookingData.user_id = user_id;
    const booking = this.bookingRepository.create(bookingData);
    booking.shopServices = services;
    booking.is_online = false;
    booking.amount = amount ? amount : totalCharge;

    const savedBooking = await this.bookingRepository.save(booking);
    // await this.bookingRepository.save(savedBooking);
    return this.response.successResponse('booking recorded', savedBooking);
  }

  async findOneByParam(
    params: { [key: string]: any },
    relations?: string[],
  ): Promise<Booking | undefined> {
    return this.bookingRepository.findOne({
      where: params,
      relations,
    });
  }

  async updateStatus(id: string, data: updateBookingStatus, user_id: string) {
    const booking = await this.findOneById(id);
    booking.status = data.status;
    booking.staff_id = user_id;
    await this.bookingRepository.save(booking);
    return this.response.successResponse('booking updated');
  }

  async findOneById(id: string): Promise<Booking | null> {
    const booking = await this.bookingRepository.findOne({
      where: { id },
    });
    if (!booking) {
      throw new NotFoundException('not fount');
    }
    return booking;
  }

  async findByParam(params: {
    [key: string]: any;
  }): Promise<Booking[] | undefined> {
    return this.bookingRepository.find({
      where: params,
      select: ['time_from', 'time_to'],
    });
  }
}
