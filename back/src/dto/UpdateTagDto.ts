import { PartialType } from '@nestjs/mapped-types';
import { CreateTagDto } from './CreateTagDto';

export class UpdateTagDto extends PartialType(CreateTagDto) {}