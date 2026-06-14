import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AffiliateCommission } from '../db/AffiliateCommission.entity';
import { User } from '../db/user.entity';
import { Order } from '../db/Order.entity';
import { Product } from '../db/Product.entity';
import { CreateAffiliateCommissionDto } from '../dto/CreateAffiliateCommissionDto';
import { UpdateAffiliateCommissionDto } from '../dto/UpdateAffiliateCommissionDto';

@Injectable()
export class AffiliateCommissionService {
  constructor(
    @InjectRepository(AffiliateCommission)
    private affiliateCommissionRepository: Repository<AffiliateCommission>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async create(createAffiliateCommissionDto: CreateAffiliateCommissionDto): Promise<AffiliateCommission> {
    const { affiliateId, orderId, productId, ...payload } = createAffiliateCommissionDto;
    const affiliate = await this.userRepository.findOne({ where: { id: affiliateId } });
    if (!affiliate) {
      throw new NotFoundException('Affiliate not found');
    }
    const order = await this.orderRepository.findOne({ where: { id: orderId } });
    if (!order) {
      throw new NotFoundException('Order not found');
    }
    const product = await this.productRepository.findOne({ where: { id: productId } });
    if (!product) {
      throw new NotFoundException('Product not found');
    }

    const commission = this.affiliateCommissionRepository.create({
      ...payload,
      affiliate,
      order,
      product,
    });
    return this.affiliateCommissionRepository.save(commission);
  }

  async findAll(): Promise<AffiliateCommission[]> {
    return this.affiliateCommissionRepository.find({ relations: ['affiliate', 'order', 'product'] });
  }

  async findOne(id: number): Promise<AffiliateCommission> {
    const commission = await this.affiliateCommissionRepository.findOne({
      where: { id },
      relations: ['affiliate', 'order', 'product'],
    });
    if (!commission) {
      throw new NotFoundException('Affiliate commission not found');
    }
    return commission;
  }

  async update(id: number, updateAffiliateCommissionDto: UpdateAffiliateCommissionDto): Promise<AffiliateCommission> {
    const commission = await this.findOne(id);
    Object.assign(commission, updateAffiliateCommissionDto);
    return this.affiliateCommissionRepository.save(commission);
  }

  async remove(id: number): Promise<void> {
    const commission = await this.findOne(id);
    await this.affiliateCommissionRepository.remove(commission);
  }
}
