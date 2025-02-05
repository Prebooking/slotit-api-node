import { Role } from 'src/roles/entities/role.entity';
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
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Booking } from 'src/bookings/entities/booking.entity';
import { ShopRoom } from 'src/shop-rooms/entities/shop-room.entity';

@Entity('users')
export class User {
  @PrimaryColumn('varchar', { length: 36 })
  @Generated('uuid')
  id: string;

  @Column('varchar', { nullable: true })
  shop_id: string;

  @Column('varchar')
  first_name: string;

  @Column('varchar')
  last_name: string;

  @Column('enum', {
    enum: ['super_admin', 'shop_owner', 'user', 'shop_admin'],
    nullable: true,
  })
  user_type: 'super_admin' | 'shop_owner' | 'user' | 'shop_admin';

  @Column('varchar', { unique: true, nullable: true })
  email: string;

  @Column('varchar', { nullable: true })
  phone: string;

  @Column('varchar', { nullable: true })
  password: string;

  @Column('boolean', { default: true })
  is_active: boolean;

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

  @BeforeInsert() async hashPassword() {
    if (this.password) {
      const saltOrRounds = 10;
      this.password = await bcrypt.hash(this.password, saltOrRounds);
    }
  }

  async validatePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }

  /*
   *
   * relationships
   */
  @ManyToMany(() => Role)
  @JoinTable({
    name: 'role_user',
    joinColumn: {
      name: 'user_id',
    },
    inverseJoinColumn: {
      name: 'role_id',
    },
  })
  roles: Role[];

  @ManyToMany(() => ShopRoom)
  @JoinTable({
    name: 'role_user',
    joinColumn: {
      name: 'user_id',
    },
    inverseJoinColumn: {
      name: 'shop_room_id',
    },
  })
  shopRooms: ShopRoom[];

  @OneToMany(() => Booking, (Booking) => Booking.user)
  bookings: Booking[];

  @OneToMany(() => Booking, (Booking) => Booking.staff)
  staffBookings: Booking[];
}
