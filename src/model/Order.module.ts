import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from '../db/Order.entity';
import { User } from '../db/user.entity';
import { Product } from '../db/Product.entity';
import { AffiliateCommission } from '../db/AffiliateCommission.entity';
import { ProductRevenueRule } from '../db/ProductRevenueRule.entity';
import { OrderService } from '../service/order.service';
import { OrderController } from '../controller/order.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Order, User, Product, AffiliateCommission, ProductRevenueRule])],
  providers: [OrderService],
  controllers: [OrderController],
  exports: [TypeOrmModule, OrderService],
})
export class OrderModule {}
