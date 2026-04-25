import { IsString, IsOptional } from 'class-validator';

export class CreateCriadorDto {
  @IsString()
  nome: string;

  @IsOptional()
  @IsString()
  descricao?: string;
}