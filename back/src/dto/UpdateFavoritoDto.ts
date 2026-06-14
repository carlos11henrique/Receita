import { PartialType } from '@nestjs/mapped-types';
import { CreateFavoritoDto } from './CreateFavoritoDto';

export class UpdateFavoritoDto extends PartialType(CreateFavoritoDto) {}