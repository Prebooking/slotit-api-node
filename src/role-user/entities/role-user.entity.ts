import { Role } from 'src/roles/entities/role.entity';
import { ShopRoom } from 'src/shop-rooms/entities/shop-room.entity';
import { Shop } from 'src/shops/entities/shop.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  PrimaryColumn,
  Generated,
} from 'typeorm';

@Entity('role_user')
export class RoleUser {
  @PrimaryColumn('varchar', { length: 36 })
  @Generated('uuid')
  id: string;

  @Column({ type: 'varchar', length: 36 })
  role_id: string;

  @Column({ type: 'varchar', length: 36 })
  user_id: string;

  @Column({ type: 'varchar', length: 36, nullable: true })
  shop_id: string;

  @Column({ type: 'varchar', length: 36, nullable: true })
  shop_room_id: string;

  @ManyToOne(() => Shop, (shop) => shop.roleUsers, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'shop_id' })
  shop: Shop;

  @ManyToOne(() => ShopRoom, (shopRoom) => shopRoom.roleUsers, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'shop_room_id' })
  shopRoom: ShopRoom;

  @ManyToOne(() => Role, (role) => role.roleUsers, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'role_id' })
  role: Role;
}
