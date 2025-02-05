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
import { AnalyticsService } from './analytics.service';
import { CreateAnalyticsDto } from './dto/create-analytics.dto';
import { UpdateAnalyticsDto } from './dto/update-analytics.dto';
import {
  GetBasicAnalyticsDto,
  GetRoomAnalyticsDto,
} from './dto/get-analytics.dto';

@Controller('analytics')
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Post()
  create(@Body() createAnalyticsDto: CreateAnalyticsDto) {
    return this.analyticsService.create(createAnalyticsDto);
  }

  @Get('basic')
  basicAnalytics(@Query() filter: GetBasicAnalyticsDto) {
    return this.analyticsService.basicAnalytics(filter);
  }

  @Get('shops/:id/rooms')
  findOne(@Param('id') id: string, @Query() filter: GetRoomAnalyticsDto) {
    return this.analyticsService.roomAnalytics(id, filter);
  }
}
