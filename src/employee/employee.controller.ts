import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { NewEmployee } from './newEmployee.dto';
import { UpdateEmployee } from './updateEmployee.dto';

@Controller('employees')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Post()
  async create(@Body() newEmployee: NewEmployee) {
    return this.employeeService.create(newEmployee);
  }

  @Get()
  async getAll() {
    return this.employeeService.getAll();
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    return this.employeeService.getById(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateEmployee: UpdateEmployee,
  ) {
    return this.employeeService.update(id, updateEmployee);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.employeeService.delete(id);
  }
}
