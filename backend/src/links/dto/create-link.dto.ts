import { IsString, IsOptional, IsBoolean, IsDateString } from 'class-validator';

export class CreateLinkDto {
  @IsString()
  originalUrl: string;

  @IsOptional()
  @IsString()
  shortCode?: string;

  @IsOptional()
  @IsString()
  customCode?: string;

  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  favicon?: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @IsOptional()
  @IsDateString()
  expiresAt?: string;

  @IsOptional()
  @IsString()
  password?: string;

  // @IsOptional()
  // @IsString()
  // folderId?: string;
}
