import { Controller, Post, Body, Get, Param, Delete } from '@nestjs/common';
import { LanguageService } from './language.service';
import { NewLanguage } from './newLanguage.dto';
import { Language } from './language.dto';

@Controller('languages')
export class LanguageController {
  constructor(private readonly languagesService: LanguageService) {}

  @Post()
  async create(@Body() newLanguage: NewLanguage): Promise<Language> {
    return this.languagesService.create(newLanguage);
  }

  @Get()
  async getAll(): Promise<Language[]> {
    return this.languagesService.getAll();
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.languagesService.remove(id);
  }
}
