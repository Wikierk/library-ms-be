import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class NewLanguage {
  @IsString()
  @IsOptional()
  id?: string;

  @IsString()
  @IsNotEmpty()
  nazwa: string;
}
