import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Patch,
  Delete,
} from '@nestjs/common';
import { BorrowingService } from './borrowing.service';
import { NewBorrowing } from './newBorrowing.dto';
import { UpdateBorrowing } from './updateBorrowing.dto';

@Controller('borrowings')
export class BorrowingController {
  constructor(private readonly borrowingService: BorrowingService) {}

  @Post()
  async create(@Body() dto: NewBorrowing) {
    return await this.borrowingService.create(dto);
  }

  @Get()
  async getAll() {
    return await this.borrowingService.getAll();
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    return await this.borrowingService.getById(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateBorrowing) {
    return await this.borrowingService.update(id, dto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.borrowingService.delete(id);
  }
}
