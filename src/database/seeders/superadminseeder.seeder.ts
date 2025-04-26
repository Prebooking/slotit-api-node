import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Seeder } from 'nestjs-seeder';
import { RoleUser } from 'src/role-user/entities/role-user.entity';
import { Role } from 'src/roles/entities/role.entity';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SuperAdminSeeder implements Seeder {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Role) private readonly roleRepository: Repository<Role>,
    @InjectRepository(RoleUser)
    private readonly roleUserRepository: Repository<RoleUser>,
  ) {}

  async seed(): Promise<any> {
    // Generate and insert user data
    const roleName = 'super_admin';
    const superAdminRole = await this.userRepository.findOneBy({
      user_type: 'super_admin',
    });
    const adminRole = await this.roleRepository.findOneBy({ name: roleName });

    if (!superAdminRole && adminRole) {
      const superAdmin = this.userRepository.create({
        first_name: 'Super',
        last_name: 'Admin',
        user_type: 'super_admin',
        email: 'superadmin@slotit.com',
        phone: '1234567890',
        password: 'securePassword',
        is_active: true,
      });

      //assigning all roles to superAdmin
      // superAdmin.roles = [adminRole];

      const user = await this.userRepository.save(superAdmin);

      const roleUser = new RoleUser();
      roleUser.role_id = adminRole.id;
      roleUser.user_id = user.id;
      return await this.roleUserRepository.save(roleUser);
    }
  }

  async drop(): Promise<any> {
    // Drop user data
  }
}
