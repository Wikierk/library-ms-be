import { IsString, IsDate, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateBorrowing {
  @IsString()
  @IsOptional()
  czytelnikId?: string;

  @IsString()
  @IsOptional()
  ksiazkaId?: string;

  @IsString()
  @IsOptional()
  pracownikId?: string;

  @IsDate()
  @Type(() => Date)
  @IsOptional()
  dataWypozyczenia?: Date;

  @IsDate()
  @Type(() => Date)
  @IsOptional()
  dataZwrotu?: Date;
}
