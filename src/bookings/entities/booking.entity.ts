import { ShopRoom } from 'src/shop-rooms/entities/shop-room.entity';
import { ShopService } from 'src/shop-service/entities/shop-service.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity('bookings')
export class Booking {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', nullable: true })
  user_id: string;

  @Column({ type: 'varchar', nullable: true })
  shop_room_id: string;

  @Column({ nullable: true })
  shop_service_id: string;

  @Column({ type: 'json', nullable: true })
  shop_service_ids: any; 

  @Column({ type: 'json', nullable: true })
  userDetail: any;

  @Column({ type: 'varchar', nullable: true })
  note: string;

  @Column({ type: 'boolean', nullable: true })
  is_online: string;

  @Column({ type: 'time', nullable: true, default: '00:00:00' })
  time_from: string;

  @Column({ type: 'time', nullable: true, default: '00:00:00' })
  time_to: string;

  @Column({ type: 'date', nullable: true })
  date: string;

  @Column({ type: 'json', nullable: true })
  meta: Record<string, any>;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp', name: 'deleted_at', nullable: true })
  deletedAt: Date;

  @ManyToOne(() => User, (user) => user.bookings, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => ShopRoom, (shopRoom) => shopRoom.bookings, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'shop_room_id' })
  shopRoom: ShopRoom;

  @ManyToOne(() => ShopService, (ShopService) => ShopService.bookings, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'shop_room_id' })
  shopService: ShopService;
}
