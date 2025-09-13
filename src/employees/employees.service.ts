import { Injectable } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';

@Injectable()
export class EmployeesService {

  private employees: CreateEmployeeDto[]= [{
    id: 1,
    name: "Alberto",
    lastName: "Costas",
    phoneNumber: "122345455"
  },{
    id: 2,
    name: "José",
    lastName: "Pérez",
    phoneNumber: "234565654"
  }]

  create(createEmployeeDto: CreateEmployeeDto) {
    createEmployeeDto.id = this.employees.length+1;
    this.employees.push(createEmployeeDto);
    return createEmployeeDto;
  }

  findAll() {
    return this.employees; //Esto retorna todos los empleados que tengamos al momento de ser llamado
  }

  findOne(id: number) {
    const employee = this.employees.filter((employee) => {
      return employee.id === id; 
    })[0] //El 0 hace que agarre el elemento y ya no esté envuelto por corchetes
    //Sería lo mismo que: const employee = this.employees.filter(employee => employee.id === id) 
    return employee;
  }

  update(id: number, updateEmployeeDto: UpdateEmployeeDto) { 
    let employeeToUpdate = this.findOne(id);
    employeeToUpdate = {
      ...employeeToUpdate,
      ...updateEmployeeDto
    }
    this.employees = this.employees.map((employee)=>{
      if(employee.id === id){
        employee = employeeToUpdate
      }
      return employee;
    });
    return employeeToUpdate;
  }

  remove(id: number) {
    this.employees = this.employees.filter((employee)=>{
      return employee.id !== id;
    }); //reescribe el arreglo con todos menos los que tienen el id que mandamos
    return this.employees;
  }
}
