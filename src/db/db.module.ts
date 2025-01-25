import { Module, Global } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ksiazka } from './entities/ksiazka.entity';
import { KsiazkaAutor } from './entities/ksiazka-autor.entity';
import { KsiazkaGatunek } from './entities/ksiazka-gatunek.entity';
import { Czytelnik } from './entities/czytelnik.entity';
import { Pracownik } from './entities/pracownik.entity';
import { Autor } from './entities/autor.entity';
import { Gatunek } from './entities/gatunek.entity';
import { Jezyk } from './entities/jezyk.entity';
import { Stanowisko } from './entities/stanowisko.entity';
import { Wypozyczenie } from './entities/wypozyczenia.entity';

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([
      Ksiazka,
      KsiazkaAutor,
      KsiazkaGatunek,
      Czytelnik,
      Pracownik,
      Autor,
      Gatunek,
      Jezyk,
      Stanowisko,
      Wypozyczenie,
    ]),
  ],
  exports: [
    TypeOrmModule.forFeature([
      Ksiazka,
      KsiazkaAutor,
      KsiazkaGatunek,
      Czytelnik,
      Pracownik,
      Autor,
      Gatunek,
      Jezyk,
      Stanowisko,
      Wypozyczenie,
    ]),
  ],
})
export class DbModule {}
