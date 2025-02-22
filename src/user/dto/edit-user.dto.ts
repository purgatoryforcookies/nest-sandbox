import { IsOptional, IsString } from 'class-validator';

export class EditUserDto {
  @IsString()
  @IsOptional()
  username?: string;
  @IsString()
  @IsOptional()
  first_name?: string;
  @IsString()
  @IsOptional()
  last_name?: string;
}
