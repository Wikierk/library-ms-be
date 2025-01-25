import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Pracownik } from '../db/entities/pracownik.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { NewEmployee } from './newEmployee.dto';
import { UpdateEmployee } from './updateEmployee.dto';
import { Employee } from './employee.dto';
import { v4 as uuidv4 } from 'uuid';
import { Stanowisko } from 'src/db/entities/stanowisko.entity';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Pracownik)
    private readonly employeeRepository: Repository<Pracownik>,
    @InjectRepository(Stanowisko)
    private readonly positionRepository: Repository<Stanowisko>,
  ) {}

  async create(newEmployee: NewEmployee): Promise<Pracownik> {
    const stanowisko = await this.positionRepository.findOne({
      where: { id: newEmployee.stanowiskoId },
    });

    if (!stanowisko) {
      throw new NotFoundException(
        'Stanowisko o podanym ID nie zostało znalezione.',
      );
    }

    const employee = this.employeeRepository.create({
      ...newEmployee,
      stanowisko,
    });
    employee.id = uuidv4();
    employee.dataZatrudnienia = new Date();
    return await this.employeeRepository.save(employee);
  }

  async getAll(): Promise<Employee[]> {
    return await this.employeeRepository.find({ relations: ['stanowisko'] });
  }

  async update(id: string, updateEmployee: UpdateEmployee): Promise<Pracownik> {
    const employee = await this.employeeRepository.findOne({
      where: { id },
      relations: ['stanowisko'],
    });

    if (!employee) {
      throw new NotFoundException(`Pracownik o ID ${id} nie został znaleziony`);
    }

    if (updateEmployee.stanowiskoId) {
      const stanowisko = await this.positionRepository.findOne({
        where: { id: updateEmployee.stanowiskoId },
      });

      if (!stanowisko) {
        throw new NotFoundException(
          `Stanowisko o ID ${updateEmployee.stanowiskoId} nie zostało znalezione`,
        );
      }

      employee.stanowisko = stanowisko;
    }

    Object.assign(employee, updateEmployee);
    return await this.employeeRepository.save(employee);
  }

  async getById(id: string): Promise<Pracownik> {
    return await this.employeeRepository.findOne({
      where: { id },
      relations: ['stanowisko'],
    });
  }

  async delete(id: string): Promise<void> {
    await this.employeeRepository.delete(id);
  }
}
