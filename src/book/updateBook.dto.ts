import { Type } from 'class-transformer';
import {
  IsOptional,
  IsString,
  IsISBN,
  IsDate,
  IsUUID,
  IsArray,
} from 'class-validator';

export class UpdateBook {
  @IsOptional()
  @IsString()
  tytul?: string;

  @IsOptional()
  @IsISBN()
  isbn?: string;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  dataPublikacji?: Date;

  @IsString()
  @IsUUID('4', { each: true })
  jezykId?: string;

  @IsArray()
  @IsUUID('4', { each: true })
  autorzyId?: string[];

  @IsArray()
  @IsUUID('4', { each: true })
  gatunkiId?: string[];
}
