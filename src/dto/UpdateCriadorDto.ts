import { PartialType } from '@nestjs/mapped-types';
import { CreateCriadorDto } from './CreateCriadorDto';

export class UpdateCriadorDto extends PartialType(CreateCriadorDto) {}