import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Stanowisko } from '../db/entities/stanowisko.entity';
import { NewPosition } from './newPosition.dto';
import { Position } from './position.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class PositionService {
  constructor(
    @InjectRepository(Stanowisko)
    private readonly positionRepository: Repository<Stanowisko>,
  ) {}

  async create(newPosition: NewPosition): Promise<NewPosition> {
    const position = new Position();
    position.id = uuidv4();
    Object.assign(position, newPosition);
    return await this.positionRepository.save(position);
  }

  async getAll(): Promise<Position[]> {
    return await this.positionRepository.find();
  }

  async remove(id: string): Promise<void> {
    const result = await this.positionRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Pozycja o id ${id} nie istnieje`);
    }
  }
}
