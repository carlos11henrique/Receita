import { IsNumber, IsOptional, IsEnum, IsInt } from 'class-validator';

export class CreatePagamentoDto {
  @IsInt()
  compraId: number;

  @IsNumber()
  valor: number;

  @IsOptional()
  @IsEnum(['pago', 'pendente', 'cancelado'])
  status?: 'pago' | 'pendente' | 'cancelado';

  @IsInt()
  formaPagamentoId: number;
}