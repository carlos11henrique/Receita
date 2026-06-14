import { IsString, IsNumber, IsOptional, IsArray, IsInt } from 'class-validator';
import { Transform } from 'class-transformer';
import { sanitize } from 'class-sanitizer';

export class CreateReceitaDto {
  @IsString()
  @Transform(({ value }) => sanitize(value))
  titulo: string;

  @IsString()
  @Transform(({ value }) => sanitize(value))
  descricao: string;

  @IsString()
  @Transform(({ value }) => sanitize(value))
  modoPreparo: string;

  @IsNumber()
  preco: number;

  @IsOptional()
  @IsInt()
  criadorId?: number;

  @IsOptional()
  @IsString()
  @Transform(({ value }) => sanitize(value))
  imageUrl?: string;

  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  categoriasIds?: number[];
}