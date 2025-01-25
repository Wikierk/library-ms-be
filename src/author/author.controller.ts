import { Controller, Post, Body, Get, Param, Delete } from '@nestjs/common';
import { AuthorService } from './author.service';
import { NewAuthor } from './newAuthor.dto';
import { Author } from './author.dto';

@Controller('authors')
export class AuthorController {
  constructor(private readonly authorsService: AuthorService) {}

  @Post()
  async create(@Body() newAuthor: NewAuthor): Promise<Author> {
    return this.authorsService.create(newAuthor);
  }

  @Get()
  async getAll(): Promise<Author[]> {
    return this.authorsService.getAll();
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.authorsService.remove(id);
  }
}
