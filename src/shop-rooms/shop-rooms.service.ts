import {
  Body,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateShopRoomDto } from './dto/create-shop-room.dto';
import { UpdateShopRoomDto } from './dto/update-shop-room.dto';
import { ShopRoom } from './entities/shop-room.entity';
import { In, IsNull, Not, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import {
  FilterOperator,
  FilterSuffix,
  paginate,
  PaginateQuery,
} from 'nestjs-paginate';
import { ResponseService } from 'src/common/services/response.service';
import { ShopsService } from 'src/shops/shops.service';
import { AddRemoveAdminDto } from './dto/add-remove-admin.dto';
import { RoleUserService } from 'src/role-user/role-user.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class ShopRoomsService {
  constructor(
    @InjectRepository(ShopRoom)
    private readonly shopRoomsRepository: Repository<ShopRoom>,
    private response: ResponseService,
    private shopsService: ShopsService,
    private roleUerService: RoleUserService,
    private userService: UsersService,
  ) {}

  async create(createShopRoomDto: CreateShopRoomDto) {
    const shop = await this.shopsService.findOneById(createShopRoomDto.shop_id);
    const newShopRoom = this.shopRoomsRepository.create(createShopRoomDto);
    const shopRoom = await this.shopRoomsRepository.save(newShopRoom);

    return this.response.successResponse('Shop room created', shopRoom);
  }
  async findAll(query: PaginateQuery, filter) {
    let where = {
      id: Not(IsNull()),
    };
    if (filter.shop_service_ids) {
      const ids = filter.shop_service_ids.split(',').filter((id) => id.trim()); // Remove empty values
      if (ids.length > 0) {
        where = {
          //@ts-ignore
          shopServices: {
            id: In(ids),
          },
        };
      }
    }
    return paginate(query, this.shopRoomsRepository, {
      sortableColumns: ['id'],
      relations: ['shopServices'],
      defaultSortBy: [['id', 'DESC']],
      searchableColumns: ['name'],
      filterableColumns: { shop_id: [FilterOperator.EQ, FilterSuffix.NOT] },
      where,
    });
  }

  async findOne(id: string): Promise<any> {
    const shopRoom = await this.findOneById(id);
    return this.response.successResponse('Shop room fetched', shopRoom);
  }

  async update(id: string, updateShopRoomDto: UpdateShopRoomDto): Promise<any> {
    const shopRoom = await this.findOneById(id);
    Object.assign(shopRoom, updateShopRoomDto);
    await this.shopRoomsRepository.save(shopRoom);
    return this.response.successResponse('Shop room updated');
  }

  async remove(id: string): Promise<any> {
    const shopRoom = await this.findOneById(id);
    await this.shopRoomsRepository.remove(shopRoom);
    return this.response.successResponse('Shop room removed');
  }

  async findOneById(id: string): Promise<ShopRoom> {
    const shopRoom = await this.shopRoomsRepository.findOne({ where: { id } });
    if (!shopRoom) {
      throw new NotFoundException(`Shop room with ID "${id}" not found`);
    }
    return shopRoom;
  }

  async addAdmin(id: string, AddRemoveAdminDto: AddRemoveAdminDto) {
    const { user_id } = AddRemoveAdminDto;

    const shopRoom = await this.findOneById(id);
    const user = await this.userService.findOneByParam({ id: user_id }, [
      'roles',
    ]);
    if (!user) {
      throw new NotFoundException('No user found');
    }
    if (user?.roles.length > 0) {
      throw new UnprocessableEntityException('cant add multiple roles to user');
    }
    await this.roleUerService.addShopAdminRole(user, shopRoom);
    return this.response.successResponse('Admin added');
  }

  async removeAdmin(id: string, AddRemoveAdminDto: AddRemoveAdminDto) {
    const { user_id } = AddRemoveAdminDto;

    const shopRoom = await this.findOneById(id);
    const user = await this.userService.findOneByParam({ id: user_id }, [
      'roles',
    ]);
    if (!user) {
      throw new NotFoundException('No user found');
    }
    if (user?.roles.length < 0) {
      throw new UnprocessableEntityException(
        'cant delete admin roles from user',
      );
    }
    await this.roleUerService.removeShopAdminRole(user, shopRoom);
    return this.response.successResponse('Admin removed');
  }

  async findRoomsByIds(ids: any[]) {
    return await this.shopRoomsRepository.find({
      where: {
        id: In(ids),
      },
    });
  }

  async findOneByShopId(shop_id: string) {
    return await this.shopRoomsRepository.find({
      where: {
        shop_id,
      },
    });
  }
}
