import { IsInt, IsNumber, IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';
import { sanitize } from 'class-sanitizer';

export class CreateOrderDto {
  @IsInt()
  customerId: number;

  @IsInt()
  productId: number;

  @IsOptional()
  @IsInt()
  affiliateId?: number;

  @IsOptional()
  @IsNumber()
  total?: number;

  @IsOptional()
  @IsString()
  @Transform(({ value }) => sanitize(value))
  status?: string;
}
