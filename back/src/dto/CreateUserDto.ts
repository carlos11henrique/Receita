import { IsString, IsEmail, MinLength, IsEnum, IsOptional, IsBoolean, IsDateString } from 'class-validator';
import { UserRole } from '../db/user-role.enum';

export class CreateUserDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsOptional()
  @IsEnum(UserRole)
  role?: UserRole;
}