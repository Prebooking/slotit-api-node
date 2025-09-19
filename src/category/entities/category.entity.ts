import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Generated,
} from 'typeorm';

@Entity('categories')
export class Category {
  @PrimaryColumn('varchar', { length: 36 })
  @Generated('uuid')
  id: string;

  @Column({ length: 255, nullable: false })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ length: 500, nullable: true })
  thumbnail: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
