import { IsString, IsNumber, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';
import { sanitize } from 'class-sanitizer';

export class UpdateAffiliateLinkDto {
  @IsOptional()
  @IsString()
  @Transform(({ value }) => sanitize(value))
  code?: string;

  @IsOptional()
  @IsNumber()
  commissionPercent?: number;

  @IsOptional()
  @IsNumber()
  totalClicks?: number;

  @IsOptional()
  @IsNumber()
  totalSales?: number;
}
