import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Czytelnik } from '../db/entities/czytelnik.entity';
import { NewReader } from './newReader.dto';
import { Reader } from './reader.dto';
import { UpdateReader } from './updateReader.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ReaderService {
  constructor(
    @InjectRepository(Czytelnik)
    private readonly readerRepository: Repository<Czytelnik>,
  ) {}

  async create(newReader: NewReader): Promise<Reader> {
    const reader = new Reader();
    reader.id = uuidv4();
    reader.dataRejestracji = new Date();
    Object.assign(reader, newReader);
    return await this.readerRepository.save(reader);
  }

  async getAll(): Promise<Reader[]> {
    return await this.readerRepository.find();
  }

  async getOne(readerId: string): Promise<Reader> {
    return await this.readerRepository.findOne({ where: { id: readerId } });
  }

  async update(id: string, updateReader: UpdateReader): Promise<Reader> {
    const reader = await this.readerRepository.findOneBy({ id });
    if (!reader) {
      throw new NotFoundException(`Czytelnik o id ${id} nie istnieje`);
    }

    Object.assign(reader, updateReader);
    return this.readerRepository.save(reader);
  }

  async remove(id: string): Promise<void> {
    const result = await this.readerRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Czytelnik o id ${id} nie istnieje`);
    }
  }
}
