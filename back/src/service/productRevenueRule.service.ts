import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductRevenueRule } from '../db/ProductRevenueRule.entity';
import { Product } from '../db/Product.entity';
import { CreateProductRevenueRuleDto } from '../dto/CreateProductRevenueRuleDto';
import { UpdateProductRevenueRuleDto } from '../dto/UpdateProductRevenueRuleDto';

@Injectable()
export class ProductRevenueRuleService {
  constructor(
    @InjectRepository(ProductRevenueRule)
    private revenueRuleRepository: Repository<ProductRevenueRule>,
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async create(createProductRevenueRuleDto: CreateProductRevenueRuleDto): Promise<ProductRevenueRule> {
    const { productId, ...payload } = createProductRevenueRuleDto;
    const product = await this.productRepository.findOne({ where: { id: productId } });
    if (!product) {
      throw new NotFoundException('Product not found');
    }

    const revenueRule = this.revenueRuleRepository.create({
      ...payload,
      product,
    });
    return this.revenueRuleRepository.save(revenueRule);
  }

  async findAll(): Promise<ProductRevenueRule[]> {
    return this.revenueRuleRepository.find({ relations: ['product'] });
  }

  async findOne(id: number): Promise<ProductRevenueRule> {
    const revenueRule = await this.revenueRuleRepository.findOne({
      where: { id },
      relations: ['product'],
    });
    if (!revenueRule) {
      throw new NotFoundException('Revenue rule not found');
    }
    return revenueRule;
  }

  async update(id: number, updateProductRevenueRuleDto: UpdateProductRevenueRuleDto): Promise<ProductRevenueRule> {
    const revenueRule = await this.findOne(id);
    if (updateProductRevenueRuleDto.productId) {
      const product = await this.productRepository.findOne({ where: { id: updateProductRevenueRuleDto.productId } });
      if (!product) {
        throw new NotFoundException('Product not found');
      }
      revenueRule.product = product;
    }
    Object.assign(revenueRule, updateProductRevenueRuleDto);
    return this.revenueRuleRepository.save(revenueRule);
  }

  async remove(id: number): Promise<void> {
    const revenueRule = await this.findOne(id);
    await this.revenueRuleRepository.remove(revenueRule);
  }
}
