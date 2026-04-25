import { IsInt } from 'class-validator';

export class CreateFavoritoDto {
  @IsInt()
  usuarioId: number;

  @IsInt()
  receitaId: number;
}