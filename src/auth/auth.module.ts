import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';
import { CommonModule } from 'src/common/common.module';
import { AuthTokenervice } from './services/auth-token.service';

@Module({
  imports: [JwtModule.register({}), UsersModule, CommonModule],
  controllers: [AuthController],
  providers: [AuthService, AuthTokenervice],
})
export class AuthModule {}
