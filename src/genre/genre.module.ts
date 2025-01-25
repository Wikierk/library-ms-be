import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GenreService } from './genre.service';
import { GenreController } from './genre.controller';
import { Gatunek } from '../db/entities/gatunek.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Gatunek])],
  controllers: [GenreController],
  providers: [GenreService],
})
export class GenreModule {}
