import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ShopServiceService } from './shop-service.service';
import { CreateShopServiceDto } from './dto/create-shop-service.dto';
import { UpdateShopServiceDto } from './dto/update-shop-service.dto';
import { Paginate, PaginateQuery } from 'nestjs-paginate';

@Controller('shop-services')
export class ShopServiceController {
  constructor(private readonly shopServiceService: ShopServiceService) {}

  @Post()
  async create(@Body() createShopServiceDto: CreateShopServiceDto) {
    return await this.shopServiceService.create(createShopServiceDto);
  }

  @Get()
  async findAll(@Paginate() query: PaginateQuery) {
    return await this.shopServiceService.findAll(query);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.shopServiceService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateShopServiceDto: UpdateShopServiceDto,
  ) {
    return await this.shopServiceService.update(id, updateShopServiceDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.shopServiceService.remove(id);
  }
}
