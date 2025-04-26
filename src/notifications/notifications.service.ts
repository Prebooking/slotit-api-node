import { Injectable } from '@nestjs/common';
import { EngagespotService } from './services/engagespot.service';

@Injectable()
export class NotificationsService {
  constructor(private engagespotService: EngagespotService) {}

  async sendNotification(
    type: string,
    recipients: Array<string>,
    data?: object,
    sendAt?: string,
  ) {
    return await this.engagespotService.send(type, recipients, data, sendAt);
  }

  async createOrUpdateUser(identifier: string, data: any) {
    return await this.engagespotService.createOrUpdateUser(identifier, data);
  }
}
