import { IsInt, IsNumber, IsOptional } from 'class-validator';

export class CreateProductRevenueRuleDto {
  @IsInt()
  productId: number;

  @IsNumber()
  creatorPercent: number;

  @IsNumber()
  sellerPercent: number;

  @IsNumber()
  affiliatePercent: number;
}
