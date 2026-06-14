import { IsInt, IsNumber, IsOptional } from 'class-validator';

export class UpdateProductRevenueRuleDto {
  @IsOptional()
  @IsInt()
  productId?: number;

  @IsOptional()
  @IsNumber()
  creatorPercent?: number;

  @IsOptional()
  @IsNumber()
  sellerPercent?: number;

  @IsOptional()
  @IsNumber()
  affiliatePercent?: number;
}
