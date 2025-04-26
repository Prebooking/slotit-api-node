import { Module } from '@nestjs/common';
import { ResponseService } from './services/response.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  controllers: [],
  imports: [ConfigModule],
  providers: [ResponseService],
  exports: [CommonModule, ConfigModule, ResponseService],
})
export class CommonModule {}
