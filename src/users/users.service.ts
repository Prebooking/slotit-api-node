import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { In, Not, Repository } from 'typeorm';
import { Role } from 'src/roles/entities/role.entity';
import {
  FilterOperator,
  FilterSuffix,
  PaginateQuery,
  paginate,
} from 'nestjs-paginate';
import { Shop } from 'src/shops/entities/shop.entity';
import { RoleUserService } from 'src/role-user/role-user.service';
import { ResponseService } from 'src/common/services/response.service';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private roleUserService: RoleUserService,
    private responseService: ResponseService,
  ) {}

  async createAdmin(createUserDto: CreateUserDto) {
    createUserDto.user_type = 'shop_admin';
    const user = await this.createUser(createUserDto);
    return this.responseService.successResponse('User Created', user);
  }

  async registerUser(createUserDto: CreateUserDto) {
    createUserDto.user_type = 'user';
    const user = await this.createUser(createUserDto);
    await this.roleUserService.addUserRole(user);
    return this.responseService.successResponse('User Created', user);
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const user = this.userRepository.create(createUserDto);
    return await this.userRepository.save(user);
  }

  async listAdmins(query: PaginateQuery, shop_id: any) {
    return await paginate(query, this.userRepository, {
      sortableColumns: ['id'],
      relations: ['shopRooms'],
      defaultSortBy: [['id', 'DESC']],
      searchableColumns: ['first_name', 'last_name'],
      filterableColumns: {
        first_name: [FilterOperator.EQ, FilterSuffix.NOT],
      },
      where: {
        shop_id,
        user_type: 'shop_admin',
      },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    await this.userRepository.update(id, updateUserDto);
    return this.userRepository.findOneBy({ id });
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async findOneByParam(
    params: { [key: string]: any },
    relations?: string[],
  ): Promise<User | undefined> {
    // Find and return the record based on dynamic parameters
    // return this.userRepository.findOneBy(params);
    return this.userRepository.findOne({
      where: params,
      relations,
    });
  }

  async findWithRelations(
    params: { [key: string]: any },
    relations: string[],
  ): Promise<User | undefined> {
    // Find and return the record based on dynamic parameters
    return this.userRepository.findOne({
      where: params,
      relations,
    });
  }

  async addRoleToUser(user: User, role: Role): Promise<User> {
    user.roles.push(role);
    return await this.userRepository.save(user);
  }

  async createShopOwnerUser(shop: Shop, password: string) {
    const userData: CreateUserDto = {
      first_name: shop.name,
      last_name: null,
      email: shop.contact_email, // Fixed typo
      phone: shop.contact_phone,
      password: password ? password : await this.generatePassword(shop.name), // Ensure `password` is defined and securely handled,
      shop_id: shop.id,
      user_type: 'shop_owner',
    };
    const user = await this.createUser(userData);
    await this.roleUserService.addShopOwnerRole(user, shop);
  }

  async generatePassword(inputString: string) {
    const formattedString = inputString.replace(/\s+/g, '').toLowerCase();
    return formattedString;
  }

  async updateStatus(id: string, request) {
    const user = await this.findOneByParam({ id });
    if (!user) {
      throw new NotFoundException('user not found');
    }
    user.is_active = request.is_active ?? false;
    await this.userRepository.save(user);
    return this.responseService.successResponse('User updated', user);
  }

  async findOneById(id: string) {
    const user = await this.findOneByParam({ id });
    if (!user) {
      throw new NotFoundException('user not found');
    }
    return user;
  }
}
