import { EngagespotClient } from '@engagespot/node';
import { Injectable } from '@nestjs/common';
import {
  ES_LOGIN_OTP,
  ENGAGESPOT_API_KEY,
  ENGAGESPOT_API_SECRET,
  ES_MEMBER_PAYMENT_REQUEST,
} from 'src/common/constants/engagespot.contants';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class EngagespotService {
  constructor() {}

  async send(
    type: string,
    recipients: Array<string>,
    data?: object,
    sendAt?: string,
  ) {
    const workflowIdentifier = await this.getWorkflowIdentifier(type);
    try {
      const client = await this.engageSpotClient();
      // console.log(data);
      client.send({
        notification: {
          workflow: { identifier: workflowIdentifier },
        },
        data: data,
        sendTo: {
          recipients,
        },
        sendAt,
      });

      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  }

  async createOrUpdateUser(identifier: string, user: any) {
    try {
      const client = await this.engageSpotClient();
      await client.createOrUpdateUser(identifier, {
        phoneNumber: user.mobile,
        name: user.name,
        email: user.email,
      });
      return true;
    } catch (err) {
      console.log(`engagespot user create error: ${err.message}`);
      return false;
    }
  }

  async engageSpotClient() {
    return EngagespotClient({
      apiKey: ENGAGESPOT_API_KEY,
      apiSecret: ENGAGESPOT_API_SECRET,
    });
  }

  async getWorkflowIdentifier(type: string) {
    let workflowIdentifier: string;

    switch (type) {
      case 'login_otp':
        workflowIdentifier = ES_LOGIN_OTP;
        break;
      case 'member_payment_request':
        workflowIdentifier = ES_MEMBER_PAYMENT_REQUEST;
        break;
      default:
        workflowIdentifier = null;
    }
    return workflowIdentifier;
  }
}
