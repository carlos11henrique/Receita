import { IsString, IsInt, MinLength, MaxLength } from 'class-validator';
import { Transform } from 'class-transformer';
import { sanitize } from 'class-sanitizer';

export class CreateProductCommentDto {
  @IsInt()
  productId!: number;

  @IsString()
  @MinLength(3)
  @MaxLength(1000)
  @Transform(({ value }) => sanitize(value))
  text!: string;
}
