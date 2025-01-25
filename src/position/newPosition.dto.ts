import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class NewPosition {
  @IsString()
  @IsOptional()
  id?: string;

  @IsString()
  @IsNotEmpty()
  nazwa: string;
}
