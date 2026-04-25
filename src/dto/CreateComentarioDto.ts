import { IsString, IsInt, IsOptional, IsDateString } from 'class-validator';
import { Transform } from 'class-transformer';
import { sanitize } from 'class-sanitizer';

export class CreateComentarioDto {
  @IsInt()
  usuarioId: number;

  @IsInt()
  receitaId: number;

  @IsString()
  @Transform(({ value }) => sanitize(value))
  texto: string;

  @IsOptional()
  @IsDateString()
  data?: string;
}