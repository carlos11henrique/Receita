import { PartialType } from '@nestjs/mapped-types';
import { CreatePagamentoDto } from './CreatePagamentoDto';

export class UpdatePagamentoDto extends PartialType(CreatePagamentoDto) {}