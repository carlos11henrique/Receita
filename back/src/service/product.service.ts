import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../db/Product.entity';
import { User } from '../db/user.entity';
import { CreateProductDto } from '../dto/CreateProductDto';
import { UpdateProductDto } from '../dto/UpdateProductDto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const { creatorId, sellerId, ...payload } = createProductDto;
    const product = this.productRepository.create({
      ...payload,
      status: 'pending',
    } as Partial<Product>);

    if (creatorId) {
      const creator = await this.userRepository.findOne({ where: { id: creatorId } });
      if (!creator) {
        throw new NotFoundException('Creator not found');
      }
      product.creator = creator;
    }

    if (sellerId) {
      const seller = await this.userRepository.findOne({ where: { id: sellerId } });
      if (!seller) {
        throw new NotFoundException('Seller not found');
      }
      product.seller = seller;
    }

    return this.productRepository.save(product);
  }

  async findAll(): Promise<Product[]> {
    return this.productRepository.find({ relations: ['creator', 'seller', 'affiliateLinks', 'revenueRule'] });
  }

  async findByStatus(status: string): Promise<Product[]> {
    return this.productRepository.find({
      where: { status },
      relations: ['creator', 'seller', 'affiliateLinks', 'revenueRule'],
    });
  }

  async findOne(id: number): Promise<Product> {
    const product = await this.productRepository.findOne({
      where: { id },
      relations: ['creator', 'seller', 'affiliateLinks', 'revenueRule'],
    });
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return product;
  }

  async update(id: number, updateProductDto: UpdateProductDto): Promise<Product> {
    const product = await this.findOne(id);
    const { creatorId, sellerId, ...payload } = updateProductDto;

    if (creatorId) {
      const creator = await this.userRepository.findOne({ where: { id: creatorId } });
      if (!creator) {
        throw new NotFoundException('Creator not found');
      }
      product.creator = creator;
    }

    if (sellerId) {
      const seller = await this.userRepository.findOne({ where: { id: sellerId } });
      if (!seller) {
        throw new NotFoundException('Seller not found');
      }
      product.seller = seller;
    }

    Object.assign(product, payload);
    return this.productRepository.save(product);
  }

  async remove(id: number): Promise<void> {
    const product = await this.findOne(id);
    await this.productRepository.remove(product);
  }
}
