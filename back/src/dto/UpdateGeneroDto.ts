import { PartialType } from '@nestjs/mapped-types';
import { CreateGeneroDto } from './CreateGeneroDto';

export class UpdateGeneroDto extends PartialType(CreateGeneroDto) {}