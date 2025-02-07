import { ConfigService } from '@nestjs/config';

const configService = new ConfigService();

export const JWT_ACCESS_SECRET =
  configService.get('JWT_ACCESS_SECRET') ||
  'YsixhMOmXK5BOt7KQeK+0K2jtiCd0aDgMY0MXYpnZJ4XwV';

export const JWT_ACCESS_EXPIRY = configService.get('JWT_ACCESS_EXPIRY') || '30d';

export const JWT_REFRESH_SECRET =
  configService.get('JWT_REFRESH_SECRET') || 'GMxhCxHNkjHITTpQW3T0KsJZKBGUa';

export const JWT_REFRESH_EXPIRY =
  configService.get('JWT_REFRESH_EXPIRY') || '30d';
