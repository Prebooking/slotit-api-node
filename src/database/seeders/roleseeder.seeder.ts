import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Seeder } from 'nestjs-seeder';
import { Role } from 'src/roles/entities/role.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RoleSeeder implements Seeder {
  constructor(
    @InjectRepository(Role) private roleRepository: Repository<Role>,
  ) {}

  async seed(): Promise<any> {
    // Generate and insert  data
    const roles = [
      { name: 'super_admin' },
      { name: 'shop_owner' },
      { name: 'user' },
      { name: 'shop_admin' },
    ];

    const rolePromises = roles.map(async (role) => {
      const existingRole = await this.roleRepository.findOneBy({
        name: role.name,
      });
      if (!existingRole) {
        await this.roleRepository.save(role);
        console.log(`Role '${role.name}' created.`);
      }
    });

    await Promise.all(rolePromises);
  }

  async drop(): Promise<any> {
    // Drop user data
    return await this.roleRepository.clear();
  }
}
