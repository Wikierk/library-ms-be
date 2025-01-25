import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Ksiazka } from '../db/entities/ksiazka.entity';
import { NewBook } from './newBook.dto';
import { Book } from './book.dto';
import { UpdateBook } from './updateBook.dto';
import { v4 as uuidv4 } from 'uuid';
import { Autor } from 'src/db/entities/autor.entity';
import { KsiazkaAutor } from 'src/db/entities/ksiazka-autor.entity';
import { BookAuthor } from './bookAuthor.dto';
import { Gatunek } from 'src/db/entities/gatunek.entity';
import { KsiazkaGatunek } from 'src/db/entities/ksiazka-gatunek.entity';
import { Jezyk } from 'src/db/entities/jezyk.entity';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Ksiazka)
    private readonly bookRepository: Repository<Ksiazka>,
    @InjectRepository(Autor)
    private readonly authorRepository: Repository<Autor>,
    @InjectRepository(KsiazkaAutor)
    private readonly bookAuthorRepository: Repository<KsiazkaAutor>,
    @InjectRepository(Gatunek)
    private readonly genreRepository: Repository<Gatunek>,
    @InjectRepository(KsiazkaGatunek)
    private readonly bookGenreRepository: Repository<KsiazkaGatunek>,
    @InjectRepository(Jezyk)
    private readonly languageRepository: Repository<Jezyk>,
  ) {}

  async create(newBook: NewBook): Promise<Ksiazka> {
    const { jezykId, autorzyId, gatunkiId, ...bookData } = newBook;

    const language = await this.languageRepository.findOne({
      where: { id: jezykId },
    });

    if (!language) {
      throw new NotFoundException('Podany język nie został znaleziony.');
    }

    const book = this.bookRepository.create({
      ...bookData,
      id: uuidv4(),
      jezyk: language,
    });

    const savedBook = await this.bookRepository.save(book);

    if (autorzyId && autorzyId.length > 0) {
      const authorPromises = autorzyId.map((authorId) => {
        this.addAuthorToBook(savedBook.id, authorId);
      });
      await Promise.all(authorPromises);
    }

    if (gatunkiId && gatunkiId.length > 0) {
      const genrePromises = gatunkiId.map((genreId) =>
        this.addGenreToBook(savedBook.id, genreId),
      );
      await Promise.all(genrePromises);
    }

    return savedBook;
  }

  async getOne(id: string): Promise<Book | NotFoundException> {
    const book = await this.bookRepository.findOne({
      where: { id },
      relations: [
        'jezyk',
        'ksiazkaAutor',
        'ksiazkaAutor.autor',
        'ksiazkaGatunek',
        'ksiazkaGatunek.gatunek',
      ],
    });

    if (!book) {
      return new NotFoundException();
    }

    return {
      id: book.id,
      isbn: book.isbn,
      tytul: book.tytul,
      dataPublikacji: book.dataPublikacji,
      jezyk: book.jezyk ? { id: book.jezyk.id, nazwa: book.jezyk.nazwa } : null,
      autorzy: Array.isArray(book.ksiazkaAutor)
        ? book.ksiazkaAutor.map((autor) => ({
            id: autor.autor.id,
            imie: autor.autor.imie,
            nazwisko: autor.autor.nazwisko,
          }))
        : [],
      gatunki: Array.isArray(book.ksiazkaGatunek)
        ? book.ksiazkaGatunek.map((gatunek) => ({
            id: gatunek.gatunek.id,
            nazwa: gatunek.gatunek.nazwa,
          }))
        : [],
      okladkaUrl: book.okladkaUrl,
    };
  }

  async getAll(): Promise<Book[]> {
    const books = await this.bookRepository.find({
      relations: [
        'jezyk',
        'ksiazkaAutor',
        'ksiazkaAutor.autor',
        'ksiazkaGatunek',
        'ksiazkaGatunek.gatunek',
      ],
    });

    return books.map((book) => ({
      id: book.id,
      isbn: book.isbn,
      tytul: book.tytul,
      dataPublikacji: book.dataPublikacji,
      jezyk: book.jezyk ? { id: book.jezyk.id, nazwa: book.jezyk.nazwa } : null,
      autorzy: book.ksiazkaAutor.map((autor) => ({
        id: autor.autor.id,
        imie: autor.autor.imie,
        nazwisko: autor.autor.nazwisko,
      })),
      gatunki: book.ksiazkaGatunek.map((gatunek) => ({
        id: gatunek.gatunek.id,
        nazwa: gatunek.gatunek.nazwa,
      })),
      okladkaUrl: book.okladkaUrl,
    }));
  }

  async update(id: string, updateBook: UpdateBook): Promise<UpdateBook> {
    const book = await this.bookRepository.findOneBy({ id });
    if (!book) {
      throw new NotFoundException(`Książka o ISBN ${id} nie istnieje`);
    }

    Object.assign(book, updateBook);
    return this.bookRepository.save(book);
  }

  async remove(id: string): Promise<void> {
    const result = await this.bookRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Książka o isbn ${id} nie istnieje`);
    }
  }

  async findBookWithAuthors(bookId: string): Promise<Ksiazka> {
    const book = await this.bookRepository.findOne({
      where: { id: bookId },
      relations: ['ksiazkaAutor', 'ksiazkaAutor.autor'],
    });

    if (!book) {
      throw new NotFoundException(
        `Książka o ID ${bookId} nie została znaleziona`,
      );
    }

    return book;
  }

  async addAuthorToBook(bookId: string, authorId: string): Promise<BookAuthor> {
    const ksiazka = await this.bookRepository.findOne({
      where: { id: bookId },
    });
    const autor = await this.authorRepository.findOne({
      where: { id: authorId },
    });

    if (!ksiazka || !autor) {
      throw new NotFoundException('Książka lub autor nie został znaleziony');
    }

    const newRelation = this.bookAuthorRepository.create({ ksiazka, autor });
    return await this.bookAuthorRepository.save(newRelation);
  }

  async deleteAuthorFromBook(
    ksiazkaId: string,
    autorId: string,
  ): Promise<void> {
    const relation = await this.bookAuthorRepository.findOne({
      where: { ksiazkaId, autorId },
    });

    if (!relation) {
      throw new NotFoundException(
        `Relacja między książką ${ksiazkaId} a autorem ${autorId} nie istnieje`,
      );
    }

    await this.bookAuthorRepository.delete({ ksiazkaId, autorId });
  }

  async addGenreToBook(
    bookId: string,
    genreId: string,
  ): Promise<KsiazkaGatunek> {
    const ksiazka = await this.bookRepository.findOne({
      where: { id: bookId },
    });
    const gatunek = await this.genreRepository.findOne({
      where: { id: genreId },
    });

    if (!ksiazka || !gatunek) {
      throw new NotFoundException('Książka lub gatunek nie został znaleziony');
    }

    const newRelation = this.bookGenreRepository.create({ ksiazka, gatunek });
    return await this.bookGenreRepository.save(newRelation);
  }

  async removeGenreFromBook(bookId: string, genreId: string): Promise<void> {
    const relation = await this.bookGenreRepository.findOne({
      where: { ksiazkaId: bookId, gatunekId: genreId },
    });

    if (!relation) {
      throw new NotFoundException(
        'Relacja między książką a gatunkiem nie została znaleziona',
      );
    }

    await this.bookGenreRepository.remove(relation);
  }

  async getGenresForBook(bookId: string): Promise<Gatunek[]> {
    const relations = await this.bookGenreRepository.find({
      where: { ksiazkaId: bookId },
      relations: ['gatunek'],
    });

    return relations.map((relation) => relation.gatunek);
  }

  async setLanguageForBook(
    bookId: string,
    languageId: string,
  ): Promise<Ksiazka> {
    const ksiazka = await this.bookRepository.findOne({
      where: { id: bookId },
    });
    const jezyk = await this.languageRepository.findOne({
      where: { id: languageId },
    });

    if (!ksiazka) {
      throw new NotFoundException('Książka nie została znaleziona');
    }

    if (!jezyk) {
      throw new NotFoundException('Język nie został znaleziony');
    }

    ksiazka.jezyk = jezyk;
    return await this.bookRepository.save(ksiazka);
  }

  async getLanguageForBook(bookId: string): Promise<Jezyk> {
    const ksiazka = await this.bookRepository.findOne({
      where: { id: bookId },
      relations: ['jezyk'],
    });

    if (!ksiazka) {
      throw new NotFoundException('Książka nie została znaleziona');
    }

    return ksiazka.jezyk;
  }

  async updateCoverUrl(bookId: string, photoUrl: string): Promise<Ksiazka> {
    const book = await this.bookRepository.findOneBy({ id: bookId });
    if (!book) {
      throw new NotFoundException('Book not found');
    }
    book.okladkaUrl = photoUrl;
    return await this.bookRepository.save(book);
  }
}
