import {
  IsString,
  IsDate,
  IsNotEmpty,
  IsPhoneNumber,
  IsEmail,
  IsOptional,
} from 'class-validator';

export class NewReader {
  @IsString()
  @IsOptional()
  id?: string;

  @IsString()
  @IsNotEmpty()
  imie: string;

  @IsString()
  @IsNotEmpty()
  nazwisko: string;

  @IsPhoneNumber('PL')
  @IsOptional()
  telefon?: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsDate()
  @IsOptional()
  dataRejestracji?: Date;
}
