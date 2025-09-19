import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { ShopsService } from './shops.service';
import { CreateShopDto } from './dto/create-shop.dto';
import { UpdateShopDto } from './dto/update-shop.dto';
import { Paginate, PaginateQuery } from 'nestjs-paginate';
import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';
import { Request, Response } from 'express';

@UseGuards(AccessTokenGuard)
@Controller('shops')
export class ShopsController {
  constructor(private readonly shopsService: ShopsService) {}

  @Post()
  async create(@Body() createShopDto: CreateShopDto) {
    return await this.shopsService.createShopWithAdmin(createShopDto);
  }

  @Get()
  async findAll(
    @Paginate() query: PaginateQuery,
    @Req() req: Request,
    @Query() filter?: any,
  ) {
    return await this.shopsService.findAll(
      query,
      req['uid'],
      filter?.category_id,
    );
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.shopsService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateShopDto: UpdateShopDto) {
    return await this.shopsService.update(id, updateShopDto);
  }
  @Patch(':id/mark-as-default')
  async markShopAsDefault(@Param('id') id: string, @Req() req: Request) {
    return await this.shopsService.markShopAsDefault(id, req['uid']);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.shopsService.remove(id);
  }
}
