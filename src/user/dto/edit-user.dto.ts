import { IsArray, IsOptional, IsString } from 'class-validator';

export class EditUserDto {
  @IsString()
  @IsOptional()
  displayName?: string;
  @IsString()
  @IsOptional()
  username?: string;

  @IsArray()
  @IsOptional()
  emails?: { value: string }[];
  @IsString()
  @IsOptional()
  familyName?: string;
  @IsString()
  @IsOptional()
  givenName?: string;
}
