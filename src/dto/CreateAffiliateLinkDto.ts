import { IsString, IsNumber, IsInt } from 'class-validator';
import { Transform } from 'class-transformer';
import { sanitize } from 'class-sanitizer';

export class CreateAffiliateLinkDto {
  @IsInt()
  affiliateId: number;

  @IsInt()
  productId: number;

  @IsString()
  @Transform(({ value }) => sanitize(value))
  code: string;

  @IsNumber()
  commissionPercent: number;
}
