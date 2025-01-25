import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReportController } from './report.controller';
import { Czytelnik } from '../db/entities/czytelnik.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Czytelnik])],
  controllers: [ReportController],
  providers: [],
})
export class ReportModule {}
