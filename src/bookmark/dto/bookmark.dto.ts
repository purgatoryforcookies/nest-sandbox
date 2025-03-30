// @ts-nocheck
import { IsOptional, IsString } from 'class-validator';

export class BookmarDto {
  @IsString()
  title: string;

  @IsString()
  link: string;

  @IsString()
  @IsOptional()
  description?: string;
}
