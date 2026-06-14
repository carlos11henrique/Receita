import { IsInt, IsNumber, IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';
import { sanitize } from 'class-sanitizer';

export class UpdateAffiliateCommissionDto {
  @IsOptional()
  @IsInt()
  affiliateId?: number;

  @IsOptional()
  @IsInt()
  orderId?: number;

  @IsOptional()
  @IsInt()
  productId?: number;

  @IsOptional()
  @IsNumber()
  amount?: number;

  @IsOptional()
  @IsNumber()
  percent?: number;

  @IsOptional()
  @IsString()
  @Transform(({ value }) => sanitize(value))
  status?: string;
}
