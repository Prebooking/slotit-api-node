import { Module } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { NotificationsController } from './notifications.controller';
import { EngagespotService } from './services/engagespot.service';

@Module({
  controllers: [NotificationsController],
  providers: [NotificationsService, EngagespotService],
})
export class NotificationsModule {}
