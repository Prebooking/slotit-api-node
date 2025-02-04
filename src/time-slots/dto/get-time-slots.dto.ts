import { IsOptional } from "class-validator";

export class GetTimeSlotDto {
    @IsOptional()
    date: Date;

    @IsOptional()
    shop_room_id: string;

    @IsOptional()
    shop_service_ids: string
}