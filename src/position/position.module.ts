import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PositionService } from './position.service';
import { PositionController } from './position.controller';
import { Stanowisko } from '../db/entities/stanowisko.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Stanowisko])],
  controllers: [PositionController],
  providers: [PositionService],
})
export class PositionModule {}
