import { IsInt, Min, Max } from 'class-validator';

export class CreateProductRatingDto {
  @IsInt()
  productId!: number;

  @IsInt()
  @Min(1)
  @Max(5)
  score!: number;
}
