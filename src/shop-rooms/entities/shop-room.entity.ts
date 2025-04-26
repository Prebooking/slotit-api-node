import { Booking } from 'src/bookings/entities/booking.entity';
import { RoleUser } from 'src/role-user/entities/role-user.entity';
import { ShopService } from 'src/shop-service/entities/shop-service.entity';
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
@Entity('shop_rooms')
export class ShopRoom {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 36, nullable: true })
  shop_id: string | null;

  @Column({ type: 'varchar', nullable: false })
  name: string;

  @Column({ type: 'varchar', nullable: true })
  description: string | null;

  @Column({ type: 'varchar', nullable: true })
  image: string | null;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;

  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  deleted_at: Date | null;

  @ManyToOne(() => Shop, (shop) => shop.rooms)
  @JoinColumn({
    name: 'shop_id',
  })
  shop: Shop;

  @OneToMany(() => RoleUser, (roleUser) => roleUser.shopRoom)
  roleUsers: RoleUser[];

  @OneToMany(() => Booking, (Booking) => Booking.shopRoom)
  bookings: Booking[];

  // @ManyToMany(() => ShopService, (shopService) => shopService.shopRooms)
  // shopServices: ShopService[];

  @ManyToMany(() => ShopService)
  @JoinTable({
    name: 'room_service',
    joinColumn: {
      name: 'shop_room_id',
    },
    inverseJoinColumn: {
      name: 'shop_service_id',
    },
  })
  shopServices: ShopService[];
}
