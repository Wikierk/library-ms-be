import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Gatunek } from '../db/entities/gatunek.entity';
import { NewGenre } from './newGenre.dto';
import { Genre } from './genre.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class GenreService {
  constructor(
    @InjectRepository(Gatunek)
    private readonly genreRepository: Repository<Gatunek>,
  ) {}

  async create(newGenre: NewGenre): Promise<Genre> {
    const genre = new Genre();
    genre.id = uuidv4();
    Object.assign(genre, newGenre);
    return await this.genreRepository.save(genre);
  }

  async getAll(): Promise<Genre[]> {
    return await this.genreRepository.find();
  }

  async remove(id: string): Promise<void> {
    const result = await this.genreRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Gatunek o id ${id} nie istnieje`);
    }
  }
}
