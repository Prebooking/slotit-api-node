import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';
import { ResponseService } from 'src/common/services/response.service';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
    private response: ResponseService,
  ) {}

  async create(createCategoryDto: CreateCategoryDto): Promise<any> {
    const category = this.categoryRepository.create(createCategoryDto);
    await this.categoryRepository.save(category);
    return this.response.successResponse('Category created', category);
  }

  async findAll(): Promise<Category[]> {
    return await this.categoryRepository.find();
  }

  async findOne(id: string): Promise<Category> {
    const category = await this.categoryRepository.findOne({ where: { id } });
    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }
    return category;
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto): Promise<any> {
    const category = await this.findOne(id);
    Object.assign(category, updateCategoryDto);
    await this.categoryRepository.save(category);
    return this.response.successResponse('Category updated', category);
  }

  async remove(id: string): Promise<any> {
    const category = await this.findOne(id);
    await this.categoryRepository.remove(category);
    return this.response.successResponse('Category deleted');
  }
}
