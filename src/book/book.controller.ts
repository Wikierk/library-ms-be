import {
  Controller,
  Post,
  Body,
  Get,
  Put,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  NotFoundException,
} from '@nestjs/common';
import { BookService } from './book.service';
import { NewBook } from './newBook.dto';
import { Book } from './book.dto';
import { UpdateBook } from './updateBook.dto';
import { KsiazkaGatunek } from 'src/db/entities/ksiazka-gatunek.entity';
import { Gatunek } from 'src/db/entities/gatunek.entity';
import { Ksiazka } from 'src/db/entities/ksiazka.entity';
import { Jezyk } from 'src/db/entities/jezyk.entity';
import { extname } from 'path';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';

@Controller('books')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post()
  async create(@Body() newBook: NewBook): Promise<Ksiazka> {
    return this.bookService.create(newBook);
  }

  @Get()
  async getAll(): Promise<Book[]> {
    return this.bookService.getAll();
  }

  @Get(':id')
  async getOne(@Param('id') id: string): Promise<Book | NotFoundException> {
    return this.bookService.getOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateBook: UpdateBook) {
    return this.bookService.update(id, updateBook);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.bookService.remove(id);
  }

  @Get(':bookId/authors')
  async findBookWithAuthors(@Param('bookId') bookId: string) {
    const book = await this.bookService.findBookWithAuthors(bookId);
    return {
      ...book,
      authors: book.ksiazkaAutor.map((relacja) => relacja.autor),
    };
  }

  @Post(':bookId/authors/:authorId')
  async addAuthorToBook(
    @Param('bookId') bookId: string,
    @Param('authorId') authorId: string,
  ) {
    return this.bookService.addAuthorToBook(bookId, authorId);
  }

  @Delete(':bookId/authors/:authorId')
  async deleteAuthorFromBook(
    @Param('bookId') bookId: string,
    @Param('authorId') authorId: string,
  ) {
    return this.bookService.deleteAuthorFromBook(bookId, authorId);
  }

  @Post(':bookId/genres/:genreId')
  async addGenreToBook(
    @Param('bookId') bookId: string,
    @Param('genreId') genreId: string,
  ): Promise<KsiazkaGatunek> {
    return this.bookService.addGenreToBook(bookId, genreId);
  }

  @Delete(':bookId/genres/:genreId')
  async removeGenreFromBook(
    @Param('bookId') bookId: string,
    @Param('genreId') genreId: string,
  ): Promise<void> {
    return this.bookService.removeGenreFromBook(bookId, genreId);
  }

  @Get(':bookId/genres')
  async getGenresForBook(@Param('bookId') bookId: string): Promise<Gatunek[]> {
    return this.bookService.getGenresForBook(bookId);
  }

  @Post(':bookId/language/:languageId')
  async setLanguageForBook(
    @Param('bookId') bookId: string,
    @Param('languageId') languageId: string,
  ): Promise<Ksiazka> {
    return this.bookService.setLanguageForBook(bookId, languageId);
  }

  @Get(':bookId/language')
  async getLanguageForBook(@Param('bookId') bookId: string): Promise<Jezyk> {
    return this.bookService.getLanguageForBook(bookId);
  }

  @Post('upload-cover')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
        bookId: {
          type: 'string',
        },
      },
      required: ['bookId'],
    },
  })
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads/images/covers',
        filename: (req, file, callback) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const fileExt = extname(file.originalname);
          callback(null, `${file.fieldname}-${uniqueSuffix}${fileExt}`);
        },
      }),
    }),
  )
  async uploadCover(
    @UploadedFile() file: Express.Multer.File,
    @Body('bookId') bookId: string,
  ) {
    const photoUrl = file.filename;
    console.log('Received bookId:', bookId);
    await this.bookService.updateCoverUrl(bookId, photoUrl);
    return { message: 'File uploaded successfully', photoUrl };
  }
}
