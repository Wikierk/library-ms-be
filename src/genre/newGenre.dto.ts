import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class NewGenre {
  @IsString()
  @IsOptional()
  id?: string;

  @IsString()
  @IsNotEmpty()
  nazwa: string;
}
