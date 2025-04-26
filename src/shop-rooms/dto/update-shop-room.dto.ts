import { PartialType } from '@nestjs/mapped-types';
import { CreateShopRoomDto } from './create-shop-room.dto';

export class UpdateShopRoomDto extends PartialType(CreateShopRoomDto) {}
