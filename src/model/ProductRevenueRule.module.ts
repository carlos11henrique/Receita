import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductRevenueRule } from '../db/ProductRevenueRule.entity';
import { Product } from '../db/Product.entity';
import { ProductRevenueRuleService } from '../service/productRevenueRule.service';
import { ProductRevenueRuleController } from '../controller/productRevenueRule.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ProductRevenueRule, Product])],
  providers: [ProductRevenueRuleService],
  controllers: [ProductRevenueRuleController],
  exports: [TypeOrmModule, ProductRevenueRuleService],
})
export class ProductRevenueRuleModule {}
