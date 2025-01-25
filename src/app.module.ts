import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './ormConfig';
import { BookModule } from './book/book.module';
import { AuthorModule } from './author/author.module';
import { GenreModule } from './genre/genre.module';
import { ReaderModule } from './reader/reader.module';
import { LanguageModule } from './language/language.module';
import { PositionModule } from './position/position.module';
import { EmployeeModule } from './employee/employee.module';
import { BorrowingModule } from './borrowing/borrowing.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ReportModule } from './report/report.module';
console.log('Path:', join(__dirname, '..', 'uploads/images/covers'));

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads/images/covers'),
      serveRoot: '/', // Serwowanie bez prefiksu
    }),
    TypeOrmModule.forRoot(typeOrmConfig),
    BookModule,
    AuthorModule,
    GenreModule,
    ReaderModule,
    LanguageModule,
    PositionModule,
    EmployeeModule,
    BorrowingModule,
    ReportModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
