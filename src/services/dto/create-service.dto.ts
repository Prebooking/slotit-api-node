import { IsString, IsNotEmpty, IsOptional, IsUUID } from 'class-validator';

export class CreateServiceDto {
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
  @IsOptional()
  identifier: string;

  @IsOptional()
  @IsUUID()
  category_id?: string;
}
