import { IsInt, IsNumber, IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';
import { sanitize } from 'class-sanitizer';

export class CreateAffiliateCommissionDto {
  @IsInt()
  affiliateId: number;

  @IsInt()
  orderId: number;

  @IsInt()
  productId: number;

  @IsNumber()
  amount: number;

  @IsNumber()
  percent: number;

  @IsOptional()
  @IsString()
  @Transform(({ value }) => sanitize(value))
  status?: string;
}
