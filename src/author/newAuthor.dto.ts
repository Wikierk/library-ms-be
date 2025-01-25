import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class NewAuthor {
  @IsString()
  @IsOptional()
  id?: string;

  @IsString()
  @IsNotEmpty()
  imie: string;

  @IsString()
  @IsNotEmpty()
  nazwisko: string;
}
