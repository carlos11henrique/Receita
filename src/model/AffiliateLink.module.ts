import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AffiliateLink } from '../db/AffiliateLink.entity';
import { User } from '../db/user.entity';
import { Product } from '../db/Product.entity';
import { AffiliateLinkService } from '../service/affiliateLink.service';
import { AffiliateLinkController } from '../controller/affiliateLink.controller';

@Module({
  imports: [TypeOrmModule.forFeature([AffiliateLink, User, Product])],
  providers: [AffiliateLinkService],
  controllers: [AffiliateLinkController],
  exports: [TypeOrmModule, AffiliateLinkService],
})
export class AffiliateLinkModule {}
