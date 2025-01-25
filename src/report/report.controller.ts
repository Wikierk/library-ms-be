import { Controller, Get } from '@nestjs/common';
import { DataSource } from 'typeorm';
@Controller('reports')
export class ReportController {
  constructor(private readonly dataSource: DataSource) {}

  @Get('borrowing-stats')
  async getBorrowingStats() {
    const query = `
     SELECT 
    "ksiazka"."tytul" AS "bookTitle",
    COUNT("wypozyczenie"."id") AS "totalBorrowings",
    AVG("wypozyczenie"."dataZwrotu" - "wypozyczenie"."dataWypozyczenia") AS "avgBorrowingDuration"
    FROM "LIBRARY"."wypozyczenie"
    JOIN "LIBRARY"."ksiazka" ON "wypozyczenie"."ksiazkaId" = "ksiazka"."id"
    WHERE "wypozyczenie"."dataZwrotu" IS NOT NULL
    GROUP BY "ksiazka"."id", "ksiazka"."tytul"


    `;
    return this.dataSource.query(query);
  }
  @Get('most-borrowed-book')
  async getMostBorrowedBook() {
    const query = `
    SELECT 
      "ksiazka"."tytul" AS bookTitle,
      COUNT("wypozyczenie"."id") AS totalBorrowings
    FROM "LIBRARY"."wypozyczenie"
    JOIN "LIBRARY"."ksiazka" ON "wypozyczenie"."ksiazkaId" = "ksiazka"."id"
    GROUP BY "ksiazka"."id", "ksiazka"."tytul"
    ORDER BY totalBorrowings DESC
    FETCH FIRST 1 ROWS ONLY
  `;
    return this.dataSource.query(query);
  }

  @Get('highest-paid-employee')
  async getHighestPaidEmployee() {
    const query = `
    SELECT 
    "pracownik"."imie" AS "firstName",
    "pracownik"."nazwisko" AS "lastName",
    "pracownik"."pensja" AS "salary"
    FROM "LIBRARY"."pracownik"
    ORDER BY "pracownik"."pensja" DESC
    FETCH FIRST 1 ROWS ONLY
  `;
    return this.dataSource.query(query);
  }

  @Get('top-readers')
  async getTopReaders() {
    const query = `
    SELECT 
    "czytelnik"."imie" AS "firstName",
    "czytelnik"."nazwisko" AS "lastName",
    COUNT("wypozyczenie"."id") AS "totalBorrowings"
    FROM "LIBRARY"."wypozyczenie"
    JOIN "LIBRARY"."czytelnik" ON "wypozyczenie"."czytelnikId" = "czytelnik"."id"
    GROUP BY "czytelnik"."id", "czytelnik"."imie", "czytelnik"."nazwisko"
    ORDER BY "totalBorrowings" DESC
  `;
    return this.dataSource.query(query);
  }

  @Get('top-employees')
  async getTopEmployees() {
    const query = `
      SELECT 
        "pracownik"."imie" AS "firstName",
        "pracownik"."nazwisko" AS "lastName",
        COUNT("wypozyczenie"."id") AS "totalBorrowings"
      FROM "LIBRARY"."wypozyczenie"
      JOIN "LIBRARY"."pracownik" ON "wypozyczenie"."pracownikId" = "pracownik"."id"
      GROUP BY "pracownik"."id", "pracownik"."imie", "pracownik"."nazwisko"
      ORDER BY "totalBorrowings" DESC
      FETCH NEXT 100 ROWS ONLY
    `;

    const result = await this.dataSource.query(query);

    return result;
  }
}
