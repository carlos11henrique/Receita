import { IsString, IsNumber, IsOptional, IsInt } from 'class-validator';
import { Transform } from 'class-transformer';
import { sanitize } from 'class-sanitizer';

export class CreateProductDto {
  @IsString()
  @Transform(({ value }) => sanitize(value))
  title: string;

  @IsString()
  @Transform(({ value }) => sanitize(value))
  description: string;

  @IsNumber()
  price: number;

  @IsOptional()
  @IsString()
  @Transform(({ value }) => sanitize(value))
  status?: string;

  @IsOptional()
  @IsInt()
  creatorId?: number;

  @IsOptional()
  @IsInt()
  sellerId?: number;
}
