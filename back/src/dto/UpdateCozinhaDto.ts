import { PartialType } from '@nestjs/mapped-types';
import { CreateCozinhaDto } from './CreateCozinhaDto';

export class UpdateCozinhaDto extends PartialType(CreateCozinhaDto) {}