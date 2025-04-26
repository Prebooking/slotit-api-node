import { Booking } from 'src/bookings/entities/booking.entity';
import { RoleUser } from 'src/role-user/entities/role-user.entity';
import { ShopRoom } from 'src/shop-rooms/entities/shop-room.entity';
import { ShopService } from 'src/shop-service/entities/shop-service.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  PrimaryColumn,
  Generated,
  ManyToMany,
  JoinTable,
  BeforeInsert,
  OneToMany,
  JoinColumn,
} from 'typeorm';
@Entity('shops')
export class Shop {
  @PrimaryColumn('varchar', { length: 36 })
  @Generated('uuid')
  id: string;

  @Column('varchar')
  name: string;

  @Column('varchar')
  description: string;

  @Column('varchar')
  image: string;

  @Column('varchar')
  whatsapp_identifier: string;

  @Column('json')
  address: object;

  @Column('varchar', { unique: true, nullable: true })
  contact_email: string;

  @Column('varchar', { nullable: true })
  contact_phone: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updated_at: Date;

  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  deleted_at: Date;

  @OneToMany(() => ShopRoom, (shopRoom) => shopRoom.shop)
  @JoinColumn({
    name: 'shop_id',
  })
  rooms: ShopRoom[];

  @OneToMany(() => ShopService, (shopService) => shopService.shop)
  @JoinColumn({
    name: 'shop_id',
  })
  shopServices: ShopService[];

  @OneToMany(() => RoleUser, (roleUser) => roleUser.shop)
  roleUsers: RoleUser[];
}
