import { IsString, IsNumber, IsOptional, IsInt } from 'class-validator';
import { Transform } from 'class-transformer';
import { sanitize } from 'class-sanitizer';

export class UpdateProductDto {
  @IsOptional()
  @IsString()
  @Transform(({ value }) => sanitize(value))
  title?: string;

  @IsOptional()
  @IsString()
  @Transform(({ value }) => sanitize(value))
  description?: string;

  @IsOptional()
  @IsNumber()
  price?: number;

  @IsOptional()
  @IsString()
  @Transform(({ value }) => sanitize(value))
  status?: string;

  @IsOptional()
  @IsString()
  @Transform(({ value }) => sanitize(value))
  rejectionReason?: string;

  @IsOptional()
  @IsInt()
  creatorId?: number;

  @IsOptional()
  @IsInt()
  sellerId?: number;
}
