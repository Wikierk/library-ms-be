import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LanguageService } from './language.service';
import { LanguageController } from './language.controller';
import { Jezyk } from '../db/entities/jezyk.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Jezyk])],
  controllers: [LanguageController],
  providers: [LanguageService],
})
export class LanguageModule {}
