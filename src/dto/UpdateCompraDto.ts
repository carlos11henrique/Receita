import { PartialType } from '@nestjs/mapped-types';
import { CreateCompraDto } from './CreateCompraDto';

export class UpdateCompraDto extends PartialType(CreateCompraDto) {}