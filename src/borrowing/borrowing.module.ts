import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BorrowingService } from './borrowing.service';
import { BorrowingController } from './borrowing.controller';
import { Pracownik } from '../db/entities/pracownik.entity';
import { Wypozyczenie } from 'src/db/entities/wypozyczenia.entity';
import { Ksiazka } from 'src/db/entities/ksiazka.entity';
import { Czytelnik } from 'src/db/entities/czytelnik.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Pracownik, Wypozyczenie, Ksiazka, Czytelnik]),
  ],
  controllers: [BorrowingController],
  providers: [BorrowingService],
})
export class BorrowingModule {}
