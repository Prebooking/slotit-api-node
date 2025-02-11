import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Shop } from './entities/shop.entity';
import { CreateShopDto } from './dto/create-shop.dto';
import { UpdateShopDto } from './dto/update-shop.dto';
import { ResponseService } from 'src/common/services/response.service';
import { paginate, PaginateQuery } from 'nestjs-paginate';
import { UsersService } from 'src/users/users.service';
import { RolesService } from 'src/roles/roles.service';
import { RoleUserService } from 'src/role-user/role-user.service';

@Injectable()
export class ShopsService {
  constructor(
    @InjectRepository(Shop)
    private readonly shopRepository: Repository<Shop>,
    private response: ResponseService,
    private userService: UsersService,
    private roleUserService: RoleUserService,
  ) {}

  async create(createShopDto: CreateShopDto) {
    const newShop = this.shopRepository.create(createShopDto);
    const shop = await this.shopRepository.save(newShop);
  }
  async createShopWithAdmin(createShopDto: CreateShopDto) {
    const { contact_email } = createShopDto;
    let user = null;
    user = await this.userService.findOneByParam({ email: contact_email });
    if (user && user.user_type != 'shop_owner') {
      throw new BadRequestException('User already exist with this mobile');
    }
    // console.log(user)
    const newShop = this.shopRepository.create(createShopDto);
    const shop = await this.shopRepository.save(newShop);

    if (!user) {
      console.log(user);

      user = await this.userService.createShopOwnerUser(
        shop,
        createShopDto.password,
      );
    }

    await this.roleUserService.addShopOwnerRole(user, shop);

    return this.response.successResponse('Shop created', shop);
  }

  async findAll(query: PaginateQuery, user_id: string) {
    return paginate(query, this.shopRepository, {
      sortableColumns: ['id'],
      relations: [],
      defaultSortBy: [['id', 'DESC']],
      searchableColumns: ['name'],
      filterableColumns: {},
      where: {
        roleUsers: {
          user_id,
          role: {
            name: 'shop_owner',
          },
        },
      },
    });
  }

  async findOne(id: string): Promise<any> {
    const shop = await this.findOneById(id);
    return this.response.successResponse('Shop fetched', shop);
  }

  async update(id: string, updateShopDto: UpdateShopDto): Promise<any> {
    const shop = await this.findOneById(id);
    Object.assign(shop, updateShopDto);
    await this.shopRepository.save(shop);
    return this.response.successResponse('Shop updated');
  }

  async remove(id: string): Promise<any> {
    const shop = await this.findOneById(id);
    await this.shopRepository.remove(shop);
    return this.response.successResponse('Shop removed');
  }

  async findOneById(id: string): Promise<Shop> {
    const shop = await this.shopRepository.findOne({ where: { id } });
    if (!shop) {
      throw new NotFoundException(`Shop with ID "${id}" not found`);
    }
    return shop;
  }

  async markShopAsDefault(shop_id: string, user_id: string) {
    const shop = await this.shopRepository.findOne({
      where: {
        id: shop_id,
        roleUsers: {
          user_id,
        },
      },
    });
    if (!shop) {
      throw new NotFoundException(`Shop with ID "${shop_id}" not found`);
    }
    await this.userService.markShopAsDefault(shop_id, user_id);
    return this.response.successResponse('Shop updated');
  }
}
