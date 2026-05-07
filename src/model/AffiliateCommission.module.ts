import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AffiliateCommission } from '../db/AffiliateCommission.entity';
import { User } from '../db/user.entity';
import { Order } from '../db/Order.entity';
import { Product } from '../db/Product.entity';
import { AffiliateCommissionService } from '../service/affiliateCommission.service';
import { AffiliateCommissionController } from '../controller/affiliateCommission.controller';

@Module({
  imports: [TypeOrmModule.forFeature([AffiliateCommission, User, Order, Product])],
  providers: [AffiliateCommissionService],
  controllers: [AffiliateCommissionController],
  exports: [TypeOrmModule, AffiliateCommissionService],
})
export class AffiliateCommissionModule {}
