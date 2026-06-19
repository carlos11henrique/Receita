import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateCozinhaDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  nome!: string;
}