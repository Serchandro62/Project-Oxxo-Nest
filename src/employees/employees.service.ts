import { Injectable } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';

@Injectable()
export class EmployeesService {

  private readonly employees = [{
    name: "Alberto",
    lastName: "Costas",
    phoneNumber: "122345455"
  },{
    name: "José",
    lastName: "Pérez",
    phoneNumber: "234565654"
  }]

  create(createEmployeeDto: CreateEmployeeDto) {
    this.employees.push(createEmployeeDto);
    return createEmployeeDto;
  }

  findAll() {
    return this.employees; //Esto retorna todos los empleados que tengamos al momento de ser llamado
  }

  findOne(id: number) {
    return `This action returns a #${id} employee`;
  }

  update(id: number, updateEmployeeDto: UpdateEmployeeDto) {
    return `This action updates a #${id} employee`;
  }

  remove(id: number) {
    return `This action removes a #${id} employee`;
  }
}
