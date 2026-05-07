import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from '../db/Product.entity';
import { User } from '../db/user.entity';
import { ProductService } from '../service/product.service';
import { ProductController } from '../controller/product.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Product, User])],
  providers: [ProductService],
  controllers: [ProductController],
  exports: [TypeOrmModule, ProductService],
})
export class ProductModule {}
