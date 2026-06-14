import { PartialType } from '@nestjs/mapped-types';
import { CreateFormaPagamentoDto } from './CreateFormaPagamentoDto';

export class UpdateFormaPagamentoDto extends PartialType(CreateFormaPagamentoDto) {}