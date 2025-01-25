import { Controller, Post, Body, Get, Param, Delete } from '@nestjs/common';
import { PositionService } from './position.service';
import { NewPosition } from './newPosition.dto';
import { Position } from './position.dto';

@Controller('positions')
export class PositionController {
  constructor(private readonly positionService: PositionService) {}

  @Post()
  async create(@Body() newPosition: NewPosition): Promise<NewPosition> {
    return this.positionService.create(newPosition);
  }

  @Get()
  async getAll(): Promise<Position[]> {
    return this.positionService.getAll();
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.positionService.remove(id);
  }
}
