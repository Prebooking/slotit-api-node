import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateShopServiceDto } from './dto/create-shop-service.dto';
import { UpdateShopServiceDto } from './dto/update-shop-service.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ShopService } from './entities/shop-service.entity';
import { In, Repository } from 'typeorm';
import { ResponseService } from 'src/common/services/response.service';
import { ShopsService } from 'src/shops/shops.service';
import { ServicesService } from 'src/services/services.service';
import {
  FilterOperator,
  FilterSuffix,
  paginate,
  PaginateQuery,
} from 'nestjs-paginate';
import { ShopRoomsService } from 'src/shop-rooms/shop-rooms.service';
import { GetRoomAnalyticsDto } from 'src/analytics/dto/get-analytics.dto';

@Injectable()
export class ShopServiceService {
  constructor(
    @InjectRepository(ShopService)
    private readonly shopServicesRepository: Repository<ShopService>,
    private response: ResponseService,
    private shopsService: ShopsService,
    private servicesService: ServicesService,
    private shopRoomsService: ShopRoomsService,
  ) {}

  async create(createShopServiceDto: CreateShopServiceDto) {
    const { shop_room_ids } = createShopServiceDto;
    const shop = await this.shopsService.findOneById(
      createShopServiceDto.shop_id,
    );
    const service = await this.servicesService.findOneById(
      createShopServiceDto.service_id,
    );

    const newShopService =
      this.shopServicesRepository.create(createShopServiceDto);
    if (shop_room_ids) {
      const shopRooms =
        await this.shopRoomsService.findRoomsByIds(shop_room_ids);
      newShopService.shopRooms = shopRooms;
    }
    const shopService = await this.shopServicesRepository.save(newShopService);

    return this.response.successResponse('Shop service created', shopService);
  }
  async findAll(query: PaginateQuery) {
    return paginate(query, this.shopServicesRepository, {
      sortableColumns: ['id'],
      relations: ['service'],
      defaultSortBy: [['id', 'DESC']],
      searchableColumns: ['name'],
      filterableColumns: {
        shop_id: [FilterOperator.EQ, FilterSuffix.NOT],
        service_id: [FilterOperator.EQ, FilterSuffix.NOT],
      },
    });
  }

  async findOne(id: string): Promise<any> {
    const shopService = await this.findOneById(id);
    return this.response.successResponse('Shop service fetched', shopService);
  }

  async update(
    id: string,
    updateShopServiceDto: UpdateShopServiceDto,
  ): Promise<any> {
    const shopService = await this.findOneById(id);
    const { shop_room_ids } = updateShopServiceDto;

    Object.assign(shopService, updateShopServiceDto);
    if (shop_room_ids) {
      const shopRooms =
        await this.shopRoomsService.findRoomsByIds(shop_room_ids);
      shopService.shopRooms = shopRooms;
    }
    await this.shopServicesRepository.save(shopService);
    return this.response.successResponse('Shop service updated');
  }

  async remove(id: string): Promise<any> {
    const shopService = await this.findOneById(id);
    await this.shopServicesRepository.remove(shopService);
    return this.response.successResponse('Shop service removed');
  }

  async findOneById(id: string): Promise<ShopService> {
    const shopService = await this.shopServicesRepository.findOne({
      where: { id },
      relations: ['shopRooms'],
    });
    if (!shopService) {
      throw new NotFoundException(`Shop service with ID "${id}" not found`);
    }
    return shopService;
  }

  async findByIds(ids: any[]): Promise<ShopService[]> {
    return await this.shopServicesRepository.find({
      where: { id: In(ids) },
    });
  }

  async shopServiceAnalytics(shop_id: string, filter: GetRoomAnalyticsDto) {
    const { from_date, to_date } = filter;
    const currentDate = new Date().toISOString().split('T')[0]; // Current date in YYYY-MM-DD format

    const query = this.shopServicesRepository
      .createQueryBuilder('ss')
      .select('ss.id', 'shop_service_id')
      .addSelect('ss.name', 'shop_service_name')
      .addSelect('COUNT(b.id)', 'bookings_count') // Count of bookings for each service
      .leftJoin('ss.Bookings', 'b') // Left join to bookings through the ManyToMany relation
      .where('ss.shop_id = :shop_id', { shop_id }); // Filter by shop_id

    // Apply date filter if provided
    if (from_date && to_date) {
      query.andWhere('b.date BETWEEN :from_date AND :to_date', {
        from_date,
        to_date,
      });
    } else {
      // If no date range, use today's date
      query.andWhere('b.date = :currentDate', { currentDate });
    }

    const result = await query.groupBy('ss.id, ss.name').getRawMany();

    // Fetch all services for the given shop_id (even if there are no bookings)
    const allServices = await this.shopServicesRepository.find({
      where: {
        shop_id,
      },
    });

    // Merge all services with the result data, setting bookings count to 0 if no bookings for the service
    const analytics = allServices.map((service) => {
      const serviceData = result.find((r) => r.shop_service_id === service.id);
      return {
        shop_service_name: service.name,
        bookings_count: serviceData ? parseInt(serviceData.bookings_count) : 0,
      };
    });

    return analytics;
  }

  async mostBookedServicesAnalytics(
    shop_id: string,
    filter: GetRoomAnalyticsDto,
  ) {
    const { from_date, to_date } = filter;
    const currentDate = new Date().toISOString().split('T')[0]; // Current date in YYYY-MM-DD format

    const query = this.shopServicesRepository
      .createQueryBuilder('ss')
      .select('ss.id', 'shop_service_id')
      .addSelect('ss.name', 'shop_service_name')
      .addSelect('COUNT(b.id)', 'bookings_count') // Count of bookings for each service
      .leftJoin('ss.Bookings', 'b') // Left join to bookings through the ManyToMany relation
      .where('ss.shop_id = :shop_id', { shop_id });

    // Apply date filter if provided
    if (from_date && to_date) {
      query.andWhere('b.date BETWEEN :from_date AND :to_date', {
        from_date,
        to_date,
      });
    } else {
      // If no date range, use today's date
      query.andWhere('b.date = :currentDate', { currentDate });
    }

    const result = await query
      .groupBy('ss.id, ss.name')
      .orderBy('bookings_count', 'DESC') // Order by the bookings count in descending order
      .limit(5) // Get top 5 services with most bookings
      .getRawMany();

    return result;
  }
}
