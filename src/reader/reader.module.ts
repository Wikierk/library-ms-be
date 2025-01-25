import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReaderService } from './reader.service';
import { ReaderController } from './reader.controller';
import { Czytelnik } from '../db/entities/czytelnik.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Czytelnik])],
  controllers: [ReaderController],
  providers: [ReaderService],
})
export class ReaderModule {}
