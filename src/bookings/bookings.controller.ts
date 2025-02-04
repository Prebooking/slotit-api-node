import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
} from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { CreateBookingAdminDto, CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { Booking } from './entities/booking.entity';
import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';
import { Paginate, PaginateQuery } from 'nestjs-paginate';

@Controller('bookings')
export class BookingsController {
  constructor(private readonly bookingService: BookingsService) {}

  @UseGuards(AccessTokenGuard)
  @Post()
  async create(@Body() bookingData: CreateBookingDto, @Req() req: Request) {
    return await this.bookingService.create(bookingData, req['uid']);
  }

  @Post('admin')
  async createBookingAdmin(
    @Body() bookingData: CreateBookingAdminDto,
    @Req() req: Request,
  ) {
    return await this.bookingService.createBookingAdmin(
      bookingData,
      req['uid'],
    );
  }

  @Get()
  async findAll(@Paginate() query: PaginateQuery) {
    return await this.bookingService.findAll(query);
  }

  @UseGuards(AccessTokenGuard)
  @Get('user')
  async findAllUser(@Paginate() query: PaginateQuery, @Req() req: Request) {
    return await this.bookingService.findAllUser(query, req['uid']);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Booking | null> {
    return await this.bookingService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() bookingData: Partial<Booking>,
  ): Promise<Booking> {
    return await this.bookingService.update(id, bookingData);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    return await this.bookingService.delete(id);
  }
}
