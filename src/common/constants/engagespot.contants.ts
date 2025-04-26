import { ConfigService } from '@nestjs/config';

const configService = new ConfigService();

export const ENGAGESPOT_API_KEY: string =
  configService.get<string>('ENGAGESPOT_API_KEY') || 'tm20l29wbholx2ki41lb';
export const ENGAGESPOT_API_SECRET: string =
  configService.get<string>('ENGAGESPOT_API_SECRET') ||
  '0pftsm6fa8eeojbfcfk72f10fg4dfeah114ia6ccg995ah0e7';

//workflow constants
export const ES_LOGIN_OTP =
  configService.get<string>('EN_LOGIN_OTP') || 'login_otp';

export const ES_MEMBER_PAYMENT_REQUEST =
  configService.get<string>('ES_MEMBER_PAYMENT_REQUEST') ||
  'member_payment_request';
