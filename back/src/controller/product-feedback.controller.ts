import { Body, Controller, Get, Param, ParseIntPipe, Post, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ProductFeedbackService } from '../service/product-feedback.service';
import { CreateProductCommentDto } from '../dto/CreateProductCommentDto';
import { CreateProductRatingDto } from '../dto/CreateProductRatingDto';

@Controller('feedback')
export class ProductFeedbackController {
  constructor(private readonly feedbackService: ProductFeedbackService) {}

  @UseGuards(JwtAuthGuard)
  @Post('comment')
  async addComment(@Request() req: any, @Body() payload: CreateProductCommentDto) {
    return this.feedbackService.addComment(req.user.userId, payload);
  }

  @UseGuards(JwtAuthGuard)
  @Post('rating')
  async addRating(@Request() req: any, @Body() payload: CreateProductRatingDto) {
    return this.feedbackService.addRating(req.user.userId, payload);
  }

  @Get('product/:productId/comments')
  async getComments(@Param('productId', ParseIntPipe) productId: number) {
    return this.feedbackService.getComments(productId);
  }

  @Get('product/:productId/ratings')
  async getRatings(@Param('productId', ParseIntPipe) productId: number) {
    return this.feedbackService.getRatings(productId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('recommendations')
  async getRecommendations(@Request() req: any) {
    return this.feedbackService.getRecommendedProducts(req.user.userId);
  }
}
