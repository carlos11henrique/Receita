import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductFeedbackService } from '../service/product-feedback.service';
import { ProductFeedbackController } from '../controller/product-feedback.controller';
import { ProductComment } from '../db/ProductComment.entity';
import { ProductRating } from '../db/ProductRating.entity';
import { Product } from '../db/Product.entity';
import { User } from '../db/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProductComment, ProductRating, Product, User])],
  providers: [ProductFeedbackService],
  controllers: [ProductFeedbackController],
  exports: [TypeOrmModule, ProductFeedbackService],
})
export class ProductFeedbackModule {}
