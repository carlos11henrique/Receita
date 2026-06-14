import { IsInt, IsOptional, IsDateString } from 'class-validator';

export class CreateCompraDto {
  @IsInt()
  usuarioId: number;

  @IsInt()
  receitaId: number;

  @IsDateString()
  dataCompra: string;

  @IsOptional()
  @IsInt()
  pagamentoId?: number;
}