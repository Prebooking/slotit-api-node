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
@Entity('services')
export class Service {
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
  identifier: string;

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

  @OneToMany(() => ShopService, (shopService) => shopService.service)
  @JoinColumn({
    name: 'service_id',
  })
  shopServices: ShopService[];
}
