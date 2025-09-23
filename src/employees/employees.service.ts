import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import {v4 as uuid} from "uuid";
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from './entities/employee.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EmployeesService {

  constructor(@InjectRepository(Employee) private employeeRepository: Repository<Employee>){}

  async create(createEmployeeDto: CreateEmployeeDto) {
    return await this.employeeRepository.save(createEmployeeDto);
  }

  //----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  async findAll() {
    return await this.employeeRepository.find();
  }

  //----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  async findOne(id: string) {
    const employee = await this.employeeRepository.findOneBy({
      employeeId: id
    });
    if(!employee) throw new NotFoundException();
    return employee;
  }

  //----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  async update(id: string, updateEmployeeDto: UpdateEmployeeDto) { 
    const employeeToUpdate = await this.employeeRepository.preload({
      employeeId: id,
      ...updateEmployeeDto
    })
    if(!employeeToUpdate) throw new NotFoundException();
    return await this.employeeRepository.save(employeeToUpdate);
  }

  //----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  async remove(id: string) {
    const result = await this.employeeRepository.delete({
      employeeId: id
    });
    if(result.affected === 0){
      throw new NotFoundException(`Employee with ID ${id} not found`);
    } 
    return {message: `Employee with ID ${id} deleted successfully`};
  }
}
