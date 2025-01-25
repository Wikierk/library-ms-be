import { IsString, IsDate, IsOptional, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

export class NewBorrowing {
  @IsString()
  @IsNotEmpty()
  czytelnikId: string;

  @IsString()
  @IsNotEmpty()
  ksiazkaId: string;

  @IsString()
  @IsNotEmpty()
  pracownikId: string;

  @IsDate()
  @Type(() => Date)
  @IsOptional()
  dataWypozyczenia?: Date;

  @IsDate()
  @Type(() => Date)
  @IsOptional()
  dataZwrotu?: Date;
}
