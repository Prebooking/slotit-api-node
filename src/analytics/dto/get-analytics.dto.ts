import { IsNotEmpty, IsOptional } from 'class-validator';

export class GetBasicAnalyticsDto {
  @IsOptional()
  from_date: Date;

  @IsOptional()
  to_date: Date;

  @IsOptional()
  shop_room_id?: number;

  @IsNotEmpty()
  shop_id?: number;
}
