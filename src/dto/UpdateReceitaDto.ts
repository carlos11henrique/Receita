import { PartialType } from '@nestjs/mapped-types';
import { CreateReceitaDto } from './CreateReceitaDto';

export class UpdateReceitaDto extends PartialType(CreateReceitaDto) {

    
}