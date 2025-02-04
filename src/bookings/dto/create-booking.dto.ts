import { Type } from 'class-transformer';
import {
  IsString,
  IsOptional,
  IsDateString,
  IsNotEmpty,
  IsArray,
  IsObject,
  IsPhoneNumber,
  ValidateNested,
  IsUUID,
  IsDate,
  ArrayMinSize,
  IsIn,
} from 'class-validator';

class UserDetails {
  @IsNotEmpty()
  @IsString()
  first_name: string;

  @IsNotEmpty()
  @IsPhoneNumber(null)
  mobile: string;
}
export class CreateBookingDto {
  @IsOptional()
  @IsString()
  user_id?: string;

  @IsNotEmpty()
  @IsString()
  shop_room_id?: string;

  @IsNotEmpty()
  @IsString()
  shop_service_id?: string;

  @IsOptional()
  @IsString()
  note?: string;

  @IsNotEmpty()
  time_from?: string;

  @IsNotEmpty()
  time_to?: string;

  @IsNotEmpty()
  date?: string;
}

export class CreateBookingAdminDto {
  @IsOptional()
  @IsString()
  user_id?: string;

  @IsNotEmpty()
  @IsString()
  shop_room_id?: string;

  @IsNotEmpty()
  @IsArray()
  shop_service_ids?: any[];

  @IsOptional()
  @IsString()
  note?: string;

  @IsNotEmpty()
  time_from?: string;

  @IsNotEmpty()
  time_to?: string;

  @IsNotEmpty()
  date?: string;

  @IsNotEmpty()
  @IsObject()
  @ValidateNested()
  @Type(() => UserDetails)
  userDetail: UserDetails;
}

export class updateBookingStatus {
  @IsString()
  @IsIn(['booked', 'completed', 'canceled'])
  status: string;
}
