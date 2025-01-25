import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookService } from './book.service';
import { BookController } from './book.controller';
import { Ksiazka } from '../db/entities/ksiazka.entity';
import { Autor } from 'src/db/entities/autor.entity';
import { KsiazkaAutor } from 'src/db/entities/ksiazka-autor.entity';
import { Gatunek } from 'src/db/entities/gatunek.entity';
import { KsiazkaGatunek } from 'src/db/entities/ksiazka-gatunek.entity';
import { Jezyk } from 'src/db/entities/jezyk.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Ksiazka,
      Autor,
      KsiazkaAutor,
      Gatunek,
      KsiazkaGatunek,
      Jezyk,
    ]),
  ],
  controllers: [BookController],
  providers: [BookService],
})
export class BookModule {}
