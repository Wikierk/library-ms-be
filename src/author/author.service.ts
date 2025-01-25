import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Autor } from '../db/entities/autor.entity';
import { NewAuthor } from './newAuthor.dto';
import { Author } from './author.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AuthorService {
  constructor(
    @InjectRepository(Autor)
    private readonly authorRepository: Repository<Autor>,
  ) {}

  async create(newAuthor: NewAuthor): Promise<Author> {
    const author = new Author();
    author.id = uuidv4();
    Object.assign(author, newAuthor);
    return await this.authorRepository.save(author);
  }

  async getAll(): Promise<Author[]> {
    return await this.authorRepository.find();
  }

  async remove(id: string): Promise<void> {
    const result = await this.authorRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Autor o id ${id} nie istnieje`);
    }
  }
}
