import { RoleUser } from 'src/role-user/entities/role-user.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Entity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  Generated,
  ManyToMany,
  JoinTable,
  OneToMany,
} from 'typeorm';

@Entity('roles')
export class Role {
  @PrimaryColumn('varchar', { length: 36 })
  @Generated('uuid')
  id: string;

  @Column('varchar', { unique: true })
  name: string;

  @Column('json', { nullable: true })
  pages: any; // JSON type for storing structured data

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

  /*
   *
   * relationships
   */
  @ManyToMany(() => User, (user) => user.roles)
  users: User[];

  @OneToMany(() => RoleUser, (roleUser) => roleUser.role)
  roleUsers: RoleUser[];
}
