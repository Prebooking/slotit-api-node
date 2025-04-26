import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsObject,
  IsMobilePhone,
  IsNumber,
  IsEnum,
  IsArray,
} from 'class-validator';
import { Gender } from 'src/common/enums/gender.enum';

export class CreateShopServiceDto {
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

  @IsString()
  @IsNotEmpty()
  service_id: string;

  @IsNotEmpty()
  @IsNumber()
  charge?: number;

  @IsOptional()
  @IsNumber()
  strike_through_charge?: number;

  @IsNotEmpty()
  @IsNumber()
  time?: number;

  @IsEnum(Gender)
  @IsOptional()
  gender: Gender;

  @IsOptional()
  @IsArray()
  shop_room_ids: any[];
}
