import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import {v4 as uuid} from "uuid";
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from './entities/employee.entity';
import { Repository } from 'typeorm';
/**
 * uuid sirve para generar cadenas largas que muy poco probablemente (pero posiblemente) generen un 
 * string igual 2 veces a lo largo del tiempo de vida de un software. Si generaras 1,000 millones de 
 * UUIDs por segundo, tardarías más que la edad del universo en tener una colisión “probable”.
 */

@Injectable()
export class EmployeesService {

  constructor(@InjectRepository(Employee) private employeeRepository: Repository<Employee>){}

  async create(createEmployeeDto: CreateEmployeeDto) {
    return await this.employeeRepository.save(createEmployeeDto);
  }

  async findAll() {
    return await this.employeeRepository.find();
  }

  async findOne(id: string) {
    const employee = await this.employeeRepository.findOneBy({
      employeeId: id
    });
    if(!employee) throw new NotFoundException();
    return employee;
  }

  async update(id: string, updateEmployeeDto: UpdateEmployeeDto) { //O sea, por más "patch" que sea, de todas formas terminamos buscando el registro original por su ID para cambiarlo todo de golpe como en un PUT
    /**
     * El preload lo que hace es BUSCAR el id en la DB, y no busca más. Siempre buscar un id, que acá abajo debe venir con el mismo nombre que le dimos al @PrimaryGeneratedColumn
     * en la entity. No crea un objeto nuevo completamente, sino que tiene que verificar que la PK indicada sí exista en la DB, y a ese objeto que obtiene, modificarlo. 
     */
    const employeeToUpdate = await this.employeeRepository.preload({
      employeeId: id,
      ...updateEmployeeDto
    })
    if(!employeeToUpdate) throw new NotFoundException();
    await this.employeeRepository.save(employeeToUpdate);
    return employeeToUpdate;
  }

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
