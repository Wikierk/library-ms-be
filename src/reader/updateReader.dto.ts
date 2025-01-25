import {
  IsOptional,
  IsString,
  IsISBN,
  IsDate,
  IsPhoneNumber,
  IsEmail,
} from 'class-validator';

export class UpdateReader {
  @IsOptional()
  @IsString()
  imie?: string;

  @IsOptional()
  @IsString()
  nazwisko?: string;

  @IsOptional()
  @IsPhoneNumber('PL')
  telefon?: string;

  @IsOptional()
  @IsEmail()
  email?: string;
}
