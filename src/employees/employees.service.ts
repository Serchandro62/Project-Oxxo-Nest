import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import {v4 as uuid} from "uuid";
/**
 * Sirve para generar cadenas largas que muy poco probablemente (pero posiblemente) generen un 
 * string igual 2 veces a lo largo del tiempo de vida de un software. Si generaras 1,000 millones de 
 * UUIDs por segundo, tardarías más que la edad del universo en tener una colisión “probable”.
 */

@Injectable()
export class EmployeesService {

  private employees: CreateEmployeeDto[]= [{
    id:uuid(),
    name: "Alberto",
    lastName: "Costas",
    phoneNumber: "122345455"
  },{
    id: uuid(),
    name: "José",
    lastName: "Pérez",
    phoneNumber: "234565654"
  }]

  create(createEmployeeDto: CreateEmployeeDto) {
    createEmployeeDto.id = uuid();
    this.employees.push(createEmployeeDto);
    return createEmployeeDto;
  }

  findAll() {
    return this.employees; //Esto retorna todos los empleados que tengamos al momento de ser llamado
  }

  findOne(id: string) {
    const employee = this.employees.filter((employee) => {
      return employee.id === id; 
    })[0] //El 0 hace que agarre el elemento y ya no esté envuelto por corchetes
    //Sería lo mismo que: const employee = this.employees.filter(employee => employee.id === id) 
    if(!employee) throw new NotFoundException();
    return employee;
  }

  update(id: string, updateEmployeeDto: UpdateEmployeeDto) { 
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

  remove(id: string) {
    this.findOne(id) //Solo verifica que no mande error. Es decir, que exista
    this.employees = this.employees.filter((employee)=>{
      return employee.id !== id;
    }); //reescribe el arreglo con todos menos los que coinciden con el id
    return this.employees;
  }
}
