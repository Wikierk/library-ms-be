import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeeService } from './employee.service';
import { EmployeeController } from './employee.controller';
import { Pracownik } from '../db/entities/pracownik.entity';
import { Stanowisko } from 'src/db/entities/stanowisko.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Pracownik, Stanowisko])],
  controllers: [EmployeeController],
  providers: [EmployeeService],
})
export class EmployeeModule {}
