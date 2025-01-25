import {
  Controller,
  Post,
  Body,
  Get,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { ReaderService } from './reader.service';
import { NewReader } from './newReader.dto';
import { Reader } from './reader.dto';
import { UpdateReader } from './updateReader.dto';

@Controller('readers')
export class ReaderController {
  constructor(private readonly readersService: ReaderService) {}

  @Post()
  async create(@Body() newReader: NewReader): Promise<Reader> {
    return this.readersService.create(newReader);
  }

  @Get()
  async getAll(): Promise<Reader[]> {
    return this.readersService.getAll();
  }

  @Get(':id')
  async getOne(@Param('id') id: string): Promise<Reader> {
    return this.readersService.getOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateReader: UpdateReader) {
    return this.readersService.update(id, updateReader);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.readersService.remove(id);
  }
}
