import { Controller, Post, Body, Get, Param, Delete } from '@nestjs/common';
import { GenreService } from './genre.service';
import { NewGenre } from './newGenre.dto';
import { Genre } from './genre.dto';

@Controller('genres')
export class GenreController {
  constructor(private readonly genresService: GenreService) {}

  @Post()
  async create(@Body() newGenre: NewGenre): Promise<Genre> {
    return this.genresService.create(newGenre);
  }

  @Get()
  async getAll(): Promise<Genre[]> {
    return this.genresService.getAll();
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.genresService.remove(id);
  }
}
