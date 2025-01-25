import { Type } from 'class-transformer';
import {
  IsString,
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsArray,
  IsUUID,
  IsISBN,
} from 'class-validator';

export class NewBook {
  @IsString()
  @IsOptional()
  id?: string;

  @IsString()
  @IsNotEmpty()
  @IsISBN()
  isbn: string;

  @IsString()
  @IsNotEmpty()
  tytul: string;

  @IsDate()
  @Type(() => Date)
  dataPublikacji: Date;

  @IsString()
  @IsUUID('4', { each: true })
  @IsNotEmpty()
  jezykId: string;

  @IsArray()
  @IsUUID('4', { each: true })
  @IsNotEmpty()
  autorzyId: string[];

  @IsArray()
  @IsUUID('4', { each: true })
  @IsNotEmpty()
  gatunkiId: string[];
}
