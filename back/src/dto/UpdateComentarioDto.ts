import { PartialType } from '@nestjs/mapped-types';
import { CreateComentarioDto } from './CreateComentarioDto';

export class UpdateComentarioDto extends PartialType(CreateComentarioDto) {}