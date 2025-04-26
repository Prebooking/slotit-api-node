import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { AuthModule } from './auth/auth.module';
import { CommonModule } from './common/common.module';
import { FileUploadsModule } from './file_uploads/file_uploads.module';
import { ServicesModule } from './services/services.module';
import { ShopsModule } from './shops/shops.module';
import { ShopRoomsModule } from './shop-rooms/shop-rooms.module';
import { ShopServiceModule } from './shop-service/shop-service.module';
import { RoleUserModule } from './role-user/role-user.module';
import { TimeSlotsModule } from './time-slots/time-slots.module';
import { BookingsModule } from './bookings/bookings.module';
import { AnalyticsModule } from './analytics/analytics.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'mysql',
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT) || 3306,
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        autoLoadEntities: true,
      }),
    }),
    UsersModule,
    RolesModule,
    AuthModule,
    CommonModule,
    FileUploadsModule,
    ServicesModule,
    ShopsModule,
    ShopRoomsModule,
    ShopServiceModule,
    RoleUserModule,
    TimeSlotsModule,
    BookingsModule,
    AnalyticsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
