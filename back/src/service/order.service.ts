import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from '../db/Order.entity';
import { AffiliateCommission } from '../db/AffiliateCommission.entity';
import { ProductRevenueRule } from '../db/ProductRevenueRule.entity';
import { User } from '../db/user.entity';
import { Product } from '../db/Product.entity';
import { CreateOrderDto } from '../dto/CreateOrderDto';
import { UpdateOrderDto } from '../dto/UpdateOrderDto';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(AffiliateCommission)
    private affiliateCommissionRepository: Repository<AffiliateCommission>,
    @InjectRepository(ProductRevenueRule)
    private revenueRuleRepository: Repository<ProductRevenueRule>,
  ) {}

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    const { customerId, productId, affiliateId, total, status } = createOrderDto;

    const customer = await this.userRepository.findOne({ where: { id: customerId } });
    if (!customer) {
      throw new NotFoundException('Customer not found');
    }

    const product = await this.productRepository.findOne({ where: { id: productId } });
    if (!product) {
      throw new NotFoundException('Product not found');
    }

    let affiliate = null;
    if (affiliateId) {
      affiliate = await this.userRepository.findOne({ where: { id: affiliateId } });
      if (!affiliate) {
        throw new NotFoundException('Affiliate not found');
      }
    }

    const orderTotal = total ?? Number(product.price);
    const order = this.orderRepository.create({
      customer,
      product,
      affiliate: affiliate ?? undefined,
      total: orderTotal,
      status: status ?? 'pending',
    });

    const savedOrder = await this.orderRepository.save(order);

    if (affiliate) {
      const revenueRule = await this.revenueRuleRepository.findOne({
        where: { product: { id: product.id } },
      });
      const percent = revenueRule?.affiliatePercent ?? 10;
      const amount = Number((orderTotal * (percent / 100)).toFixed(2));

      const commission = this.affiliateCommissionRepository.create({
        affiliate,
        order: savedOrder,
        product,
        amount,
        percent,
        status: 'pending',
      });
      await this.affiliateCommissionRepository.save(commission);
    }

    return this.findOne(savedOrder.id);
  }

  async findAll(): Promise<Order[]> {
    return this.orderRepository.find({ relations: ['customer', 'product', 'affiliate', 'commissions'] });
  }

  async findOne(id: number): Promise<Order> {
    const order = await this.orderRepository.findOne({
      where: { id },
      relations: ['customer', 'product', 'affiliate', 'commissions'],
    });
    if (!order) {
      throw new NotFoundException('Order not found');
    }
    return order;
  }

  async update(id: number, updateOrderDto: UpdateOrderDto): Promise<Order> {
    const order = await this.findOne(id);
    const { customerId, productId, affiliateId, ...payload } = updateOrderDto;

    if (customerId) {
      const customer = await this.userRepository.findOne({ where: { id: customerId } });
      if (!customer) {
        throw new NotFoundException('Customer not found');
      }
      order.customer = customer;
    }

    if (productId) {
      const product = await this.productRepository.findOne({ where: { id: productId } });
      if (!product) {
        throw new NotFoundException('Product not found');
      }
      order.product = product;
    }

    if (affiliateId) {
      const affiliate = await this.userRepository.findOne({ where: { id: affiliateId } });
      if (!affiliate) {
        throw new NotFoundException('Affiliate not found');
      }
      order.affiliate = affiliate;
    }

    Object.assign(order, payload);
    return this.orderRepository.save(order);
  }

  async remove(id: number): Promise<void> {
    const order = await this.findOne(id);
    await this.orderRepository.remove(order);
  }
}
