import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Jezyk } from '../db/entities/jezyk.entity';
import { NewLanguage } from './newLanguage.dto';
import { Language } from './language.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class LanguageService {
  constructor(
    @InjectRepository(Jezyk)
    private readonly languageRepository: Repository<Jezyk>,
  ) {}

  async create(newLanguage: NewLanguage): Promise<Language> {
    const language = new Language();
    language.id = uuidv4();
    Object.assign(language, newLanguage);
    return await this.languageRepository.save(language);
  }

  async getAll(): Promise<Language[]> {
    return await this.languageRepository.find();
  }

  async remove(id: string): Promise<void> {
    const result = await this.languageRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Jezyk o id ${id} nie istnieje`);
    }
  }
}
