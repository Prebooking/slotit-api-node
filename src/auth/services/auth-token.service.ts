import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import {
  JWT_ACCESS_EXPIRY,
  JWT_ACCESS_SECRET,
  JWT_REFRESH_EXPIRY,
  JWT_REFRESH_SECRET,
} from 'src/common/constants/jwt.constants';

@Injectable()
export class AuthTokenervice {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async generateTokens(userId: string, username: string) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: userId,
          username,
        },
        {
          secret: JWT_ACCESS_SECRET,
          expiresIn: JWT_ACCESS_EXPIRY,
        },
      ),
      this.jwtService.signAsync(
        {
          sub: userId,
          username,
        },
        {
          secret: JWT_REFRESH_SECRET,
          expiresIn: JWT_REFRESH_EXPIRY,
        },
      ),
    ]);

    return {
      type: 'Bearer',
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }
}
