import { seeder } from 'nestjs-seeder';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { RoleSeeder } from '../roleseeder.seeder';
import { User } from 'src/users/entities/user.entity';
import { Role } from 'src/roles/entities/role.entity';
import { SuperAdminSeeder } from '../superadminseeder.seeder';
import { Service } from 'src/services/entities/service.entity';
import { ServiceSeeder } from '../serviceseeder.seeder';
import { TimeSlot } from 'src/time-slots/entities/time-slot.entity';
import { TimeSlotSeeder } from '../timeslotseeder.seeder';
import { ShopService } from 'src/shop-service/entities/shop-service.entity';
import { Shop } from 'src/shops/entities/shop.entity';
import { ShopRoom } from 'src/shop-rooms/entities/shop-room.entity';
import { RoleUser } from 'src/role-user/entities/role-user.entity';
import { Booking } from 'src/bookings/entities/booking.entity';

seeder({
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
    TypeOrmModule.forFeature([
      User,
      Role,
      Service,
      ShopService,
      ShopRoom,
      Shop,
      RoleUser,
      TimeSlot,
      Booking,
    ]),
  ],
}).run([RoleSeeder, SuperAdminSeeder, ServiceSeeder, TimeSlotSeeder]);
