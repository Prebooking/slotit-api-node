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
import { ShopRoomsService } from './shop-rooms.service';
import { CreateShopRoomDto } from './dto/create-shop-room.dto';
import { UpdateShopRoomDto } from './dto/update-shop-room.dto';
import { Paginate, PaginateQuery } from 'nestjs-paginate';
import { AddRemoveAdminDto } from './dto/add-remove-admin.dto';
import { Request } from 'express';

@Controller('shop-rooms')
export class ShopRoomsController {
  constructor(private readonly shopRoomsService: ShopRoomsService) {}

  @Post()
  async create(@Body() createShopRoomDto: CreateShopRoomDto) {
    return await this.shopRoomsService.create(createShopRoomDto);
  }

  @Get()
  async findAll(@Query() filter: Request, @Paginate() query: PaginateQuery) {
    return await this.shopRoomsService.findAll(query, filter);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.shopRoomsService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateShopRoomDto: UpdateShopRoomDto,
  ) {
    return await this.shopRoomsService.update(id, updateShopRoomDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.shopRoomsService.remove(id);
  }

  @Post(':id/add-admin')
  async addAdmin(
    @Param('id') id: string,
    @Body() AddRemoveAdminDto: AddRemoveAdminDto,
  ) {
    return await this.shopRoomsService.addAdmin(id, AddRemoveAdminDto);
  }

  @Post(':id/remove-admin')
  async removeAdmin(
    @Param('id') id: string,
    @Body() AddRemoveAdminDto: AddRemoveAdminDto,
  ) {
    return await this.shopRoomsService.removeAdmin(id, AddRemoveAdminDto);
  }
}
