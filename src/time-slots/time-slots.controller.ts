import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { TimeSlotsService } from './time-slots.service';
import { CreateTimeSlotDto } from './dto/create-time-slot.dto';
import { UpdateTimeSlotDto } from './dto/update-time-slot.dto';
import { Paginate, PaginateQuery } from 'nestjs-paginate';
import { GetTimeSlotDto } from './dto/get-time-slots.dto';

@Controller('time-slots')
export class TimeSlotsController {
  constructor(private readonly timeSlotsService: TimeSlotsService) {}

  @Post()
  create(@Body() createTimeSlotDto: CreateTimeSlotDto) {
    return this.timeSlotsService.create(createTimeSlotDto);
  }

  @Get()
  async findAll(@Paginate() query: PaginateQuery) {
    return await this.timeSlotsService.findAll(query);
  }

  @Get('admin')
  async findAllAdmin(
    @Paginate() query: PaginateQuery,
    @Query() filter: Record<string, any>,
  ) {
    return await this.timeSlotsService.findAllAdmin(query, filter);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.timeSlotsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTimeSlotDto: UpdateTimeSlotDto,
  ) {
    return this.timeSlotsService.update(+id, updateTimeSlotDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.timeSlotsService.remove(+id);
  }
}
