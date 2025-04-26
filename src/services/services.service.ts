import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Service } from './entities/service.entity';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { ResponseService } from 'src/common/services/response.service';
import { paginate, PaginateQuery } from 'nestjs-paginate';

@Injectable()
export class ServicesService {
  constructor(
    @InjectRepository(Service)
    private readonly serviceRepository: Repository<Service>,
    private response: ResponseService,
  ) {}

  async create(createServiceDto: CreateServiceDto) {
    const newService = this.serviceRepository.create(createServiceDto);
    const service = await this.serviceRepository.save(newService);
    return this.response.successResponse('Service created', service);
  }
  async findAll(query: PaginateQuery) {
    return paginate(query, this.serviceRepository, {
      sortableColumns: ['id'],
      relations: [],
      defaultSortBy: [['id', 'DESC']],
      searchableColumns: ['name'],
      filterableColumns: {},
    });
  }

  async findOne(id: string): Promise<any> {
    const service = await this.findOneById(id);
    return this.response.successResponse('Service fetched', service);
  }

  async update(id: string, updateServiceDto: UpdateServiceDto) {
    const service = await this.findOneById(id);
    Object.assign(service, updateServiceDto);
    await this.serviceRepository.save(service);
    return this.response.successResponse('Service updated');
  }

  async remove(id: string): Promise<any> {
    const service = await this.findOneById(id);
    await this.serviceRepository.remove(service);
    return this.response.successResponse('Service deletes');
  }

  async findOneById(id: string): Promise<Service> {
    const service = await this.serviceRepository.findOne({ where: { id } });
    if (!service) {
      throw new NotFoundException(`Service with ID "${id}" not found`);
    }
    return service;
  }
}
