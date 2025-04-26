import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  BadRequestException,
  Request,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Paginate, PaginateQuery } from 'nestjs-paginate';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('create-admin')
  async createAdmin(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.createAdmin(createUserDto);
  }

  @Post('register')
  async registerUser(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.registerUser(createUserDto);
  }

  @Get('admins')
  listAdmins(
    @Query('shop_id') shop_id: string,
    @Paginate() query: PaginateQuery,
  ) {
    if (!shop_id) {
      throw new BadRequestException('shop_id required');
    }
    return this.usersService.listAdmins(query, shop_id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Post(':id/update-status')
  updateStatus(@Param('id') id: string, @Body() request: Request) {
    return this.usersService.updateStatus(id, request);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
