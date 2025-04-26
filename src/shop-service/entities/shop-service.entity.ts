import { Booking } from 'src/bookings/entities/booking.entity';
import { Gender } from 'src/common/enums/gender.enum';
import { Service } from 'src/services/entities/service.entity';
import { ShopRoom } from 'src/shop-rooms/entities/shop-room.entity';
import { Shop } from 'src/shops/entities/shop.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';
@Entity('shop_services')
export class ShopService {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 36, nullable: true })
  shop_id: string | null;

  @Column({ type: 'varchar', length: 36, nullable: true })
  service_id: string | null;

  @Column({ type: 'varchar', nullable: false })
  name: string;

  @Column({ type: 'varchar', nullable: true })
  description: string | null;

  @Column({ type: 'varchar', nullable: true })
  image: string | null;

  @Column({ type: 'decimal', precision: 20, scale: 2, default: 0.0 })
  charge: number;

  @Column({ type: 'decimal', precision: 20, scale: 2, default: 0.0 })
  strike_through_charge: number;

  @Column({ type: 'int', default: 0 })
  time: number;

  @Column({
    type: 'enum',
    enum: Gender,
    default: Gender.COMMON,
  })
  gender: Gender;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;

  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  deleted_at: Date | null;

  @ManyToOne(() => Shop, (shop) => shop.shopServices)
  @JoinColumn({
    name: 'shop_id',
  })
  shop: Shop;

  @ManyToOne(() => Service, (service) => service.shopServices)
  @JoinColumn({
    name: 'service_id',
  })
  service: Service;

  // @OneToMany(() => Booking, (Booking) => Booking.shopService)
  // bookings: Booking[];

  @ManyToMany(() => ShopRoom)
  @JoinTable({
    name: 'room_service',
    joinColumn: {
      name: 'shop_service_id',
    },
    inverseJoinColumn: {
      name: 'shop_room_id',
    },
  })
  shopRooms: ShopRoom[];

  @ManyToMany(() => Booking)
  @JoinTable({
    name: 'booking_service',
    joinColumn: {
      name: 'shop_service_id',
    },
    inverseJoinColumn: {
      name: 'booking_id',
    },
  })
  Bookings: Booking[];
}
