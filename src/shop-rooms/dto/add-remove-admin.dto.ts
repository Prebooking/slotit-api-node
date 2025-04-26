import { IsNotEmpty } from 'class-validator';

export class AddRemoveAdminDto {
  @IsNotEmpty()
  user_id: string;
}
