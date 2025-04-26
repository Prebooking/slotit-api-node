import { Injectable } from '@nestjs/common';
import { CreateRoleUserDto } from './dto/create-role-user.dto';
import { UpdateRoleUserDto } from './dto/update-role-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleUser } from './entities/role-user.entity';
import { ResponseService } from 'src/common/services/response.service';
import { Repository } from 'typeorm';
import { Shop } from 'src/shops/entities/shop.entity';
import { RolesService } from 'src/roles/roles.service';
import { User } from 'src/users/entities/user.entity';
import { ShopRoom } from 'src/shop-rooms/entities/shop-room.entity';

@Injectable()
export class RoleUserService {
  constructor(
    @InjectRepository(RoleUser)
    private readonly roleUserRepository: Repository<RoleUser>,
    private response: ResponseService,
    private rolesService: RolesService,
  ) {}

  async initiateInstance(): Promise<RoleUser> {
    return new RoleUser();
  }

  async saveInstance(roleUser: RoleUser): Promise<RoleUser> {
    return await this.roleUserRepository.save(roleUser);
  }

  async addShopOwnerRole(user: User, shop: Shop): Promise<RoleUser> {
    const role = await this.rolesService.findOneByName('shop_owner');

    const roleUser = await this.initiateInstance();
    roleUser.role_id = role.id;
    roleUser.user_id = user.id;
    roleUser.shop = shop;
    return await this.saveInstance(roleUser);
  }

  async addShopAdminRole(user: User, shopRoom: ShopRoom): Promise<RoleUser> {
    const role = await this.rolesService.findOneByName('shop_admin');

    const roleUser = await this.initiateInstance();
    roleUser.role_id = role.id;
    roleUser.user_id = user.id;
    roleUser.shop_id = shopRoom.shop_id;
    roleUser.shop_room_id = shopRoom.id;

    return await this.saveInstance(roleUser);
  }

  async addUserRole(user: User): Promise<RoleUser> {
    const role = await this.rolesService.findOneByName('user');

    const roleUser = await this.initiateInstance();
    roleUser.role_id = role.id;
    roleUser.user_id = user.id;
    return await this.saveInstance(roleUser);
  }

  async removeShopAdminRole(user: User, shopRoom: ShopRoom) {
    await this.roleUserRepository.delete({
      user_id: user.id,
      shop_room_id: shopRoom.id,
    });
  }
}
