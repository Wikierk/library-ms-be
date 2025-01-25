import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Wypozyczenie } from '../db/entities/wypozyczenia.entity';
import { NewBorrowing } from './newBorrowing.dto';
import { UpdateBorrowing } from './updateBorrowing.dto';
import { Czytelnik } from '../db/entities/czytelnik.entity';
import { Ksiazka } from '../db/entities/ksiazka.entity';
import { Pracownik } from '../db/entities/pracownik.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class BorrowingService {
  constructor(
    @InjectRepository(Wypozyczenie)
    private readonly borrowingRepository: Repository<Wypozyczenie>,
    @InjectRepository(Czytelnik)
    private readonly readerRepository: Repository<Czytelnik>,
    @InjectRepository(Ksiazka)
    private readonly bookRepository: Repository<Ksiazka>,
    @InjectRepository(Pracownik)
    private readonly employeeRepository: Repository<Pracownik>,
  ) {}

  async create(dto: NewBorrowing): Promise<Wypozyczenie> {
    const czytelnik = await this.readerRepository.findOne({
      where: { id: dto.czytelnikId },
    });
    const ksiazka = await this.bookRepository.findOne({
      where: { id: dto.ksiazkaId },
    });
    const pracownik = await this.employeeRepository.findOne({
      where: { id: dto.pracownikId },
    });

    if (!czytelnik || !ksiazka || !pracownik) {
      throw new NotFoundException(
        'Czytelnik, książka lub pracownik nie zostali znalezieni',
      );
    }

    const wypozyczenie = this.borrowingRepository.create({
      id: uuidv4(),
      czytelnik,
      ksiazka,
      pracownik,
      dataWypozyczenia: dto.dataWypozyczenia || new Date(),
      dataZwrotu: dto.dataZwrotu || null,
    });

    return await this.borrowingRepository.save(wypozyczenie);
  }

  async getAll(): Promise<Wypozyczenie[]> {
    return await this.borrowingRepository.find({
      relations: ['czytelnik', 'ksiazka', 'pracownik'],
    });
  }

  async getById(id: string): Promise<Wypozyczenie> {
    const wypozyczenie = await this.borrowingRepository.findOne({
      where: { id },
      relations: ['czytelnik', 'ksiazka', 'pracownik'],
    });

    if (!wypozyczenie) {
      throw new NotFoundException('Wypożyczenie nie zostało znalezione');
    }

    return wypozyczenie;
  }

  async update(id: string, dto: UpdateBorrowing): Promise<Wypozyczenie> {
    const wypozyczenie = await this.getById(id);

    if (dto.czytelnikId) {
      wypozyczenie.czytelnik = await this.readerRepository.findOne({
        where: { id: dto.czytelnikId },
      });
    }

    if (dto.ksiazkaId) {
      wypozyczenie.ksiazka = await this.bookRepository.findOne({
        where: { id: dto.ksiazkaId },
      });
    }

    if (dto.pracownikId) {
      wypozyczenie.pracownik = await this.employeeRepository.findOne({
        where: { id: dto.pracownikId },
      });
    }
    wypozyczenie.dataZwrotu = new Date();
    Object.assign(wypozyczenie, dto);
    return await this.borrowingRepository.save(wypozyczenie);
  }

  async delete(id: string): Promise<void> {
    const wypozyczenie = await this.getById(id);
    await this.borrowingRepository.remove(wypozyczenie);
  }
}
