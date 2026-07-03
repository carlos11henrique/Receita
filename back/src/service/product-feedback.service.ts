import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductComment } from '../db/ProductComment.entity';
import { ProductRating } from '../db/ProductRating.entity';
import { Product } from '../db/Product.entity';
import { User } from '../db/user.entity';
import { CreateProductCommentDto } from '../dto/CreateProductCommentDto';
import { CreateProductRatingDto } from '../dto/CreateProductRatingDto';

@Injectable()
export class ProductFeedbackService {
  constructor(
    @InjectRepository(ProductComment)
    private productCommentRepository: Repository<ProductComment>,
    @InjectRepository(ProductRating)
    private productRatingRepository: Repository<ProductRating>,
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async addComment(userId: number, createProductCommentDto: CreateProductCommentDto) {
    const product = await this.productRepository.findOne({ where: { id: createProductCommentDto.productId } });
    if (!product) throw new NotFoundException('Produto não encontrado');

    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) throw new NotFoundException('Usuário não encontrado');

    const comment = this.productCommentRepository.create({
      user,
      product,
      text: createProductCommentDto.text,
    });

    return this.productCommentRepository.save(comment);
  }

  async addRating(userId: number, createProductRatingDto: CreateProductRatingDto) {
    const product = await this.productRepository.findOne({ where: { id: createProductRatingDto.productId } });
    if (!product) throw new NotFoundException('Produto não encontrado');

    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) throw new NotFoundException('Usuário não encontrado');

    let rating = await this.productRatingRepository.findOne({ where: { user: { id: userId }, product: { id: product.id } } });
    if (!rating) {
      rating = this.productRatingRepository.create({
        user,
        product,
        score: createProductRatingDto.score,
      });
    } else {
      rating.score = createProductRatingDto.score;
    }

    await this.productRatingRepository.save(rating);
    return this.calculateProductScore(product.id);
  }

  async getComments(productId: number) {
    return this.productCommentRepository.find({
      where: { product: { id: productId } },
      relations: ['user'],
      order: { createdAt: 'DESC' },
    });
  }

  async getRatings(productId: number) {
    return this.productRatingRepository.find({
      where: { product: { id: productId } },
      relations: ['user'],
    });
  }

  async calculateProductScore(productId: number) {
    const ratings = await this.productRatingRepository.find({
      where: { product: { id: productId } },
    });

    if (ratings.length === 0) {
      return { rating: 0, reviews: 0 };
    }

    const total = ratings.reduce((sum, rating) => sum + rating.score, 0);
    const average = Number((total / ratings.length).toFixed(1));
    return { rating: average, reviews: ratings.length };
  }

  async getRecommendedProducts(userId: number) {
    const ratings = await this.productRatingRepository.find({
      where: { user: { id: userId } },
      relations: ['product'],
    });

    const likedProductIds = ratings.filter((rating) => rating.score >= 4).map((rating) => rating.product.id);
    const allProducts = await this.productRepository.find({ relations: ['creator'] });

    const recommended = allProducts.filter((product) => !likedProductIds.includes(product.id));
    return recommended.slice(0, 5);
  }
}
