import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Seeder } from 'nestjs-seeder';
import { Service } from 'src/services/entities/service.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ServiceSeeder implements Seeder {
  constructor(
    @InjectRepository(Service) private serviceRepository: Repository<Service>,
  ) {}

  async seed(): Promise<any> {
    // Generate and insert  data
    const services = [
      { name: 'Hair Cut' },
      { name: 'Shaving' },
      { name: 'Beard Trim' },
      { name: 'Hair Wash' },
      { name: 'Facial' },
      { name: 'Head Shave' },
      { name: 'Hair Styling' },
      { name: 'Hot Towel Shave' },
      { name: 'Hair Color' },
      { name: "Kids' Haircut" },
    ];
    const servicePromises = services.map(async (service) => {
      const existingRole = await this.serviceRepository.findOneBy({
        name: service.name,
      });
      if (!existingRole) {
        await this.serviceRepository.save(service);
        console.log(`Service '${service.name}' created.`);
      }
    });

    await Promise.all(servicePromises);
  }

  async drop(): Promise<any> {
    // Drop user data
    return await this.serviceRepository.clear();
  }
}
