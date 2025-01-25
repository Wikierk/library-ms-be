import { Type } from 'class-transformer';
import { IsString, IsOptional, IsDate, IsNumber } from 'class-validator';

export class NewEmployee {
  @IsString()
  @IsOptional()
  id?: string;

  @IsString()
  @IsOptional()
  imie?: string;

  @IsString()
  @IsOptional()
  nazwisko?: string;

  @IsDate()
  @Type(() => Date)
  @IsOptional()
  dataZatrudnienia?: Date;

  @IsNumber()
  @IsOptional()
  pensja?: number;

  @IsString()
  @IsOptional()
  stanowiskoId?: string;
}
