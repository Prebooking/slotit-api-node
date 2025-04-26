import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsObject,
  IsMobilePhone,
} from 'class-validator';

export class CreateShopRoomDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsString()
  @IsOptional()
  image: string;

  @IsString()
  @IsNotEmpty()
  shop_id: string;
}
