import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import {v4 as uuid} from "uuid";
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from './entities/employee.entity';
import { Repository } from 'typeorm';
import { Location } from 'src/locations/entities/location.entity';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class EmployeesService {

  constructor(
    @InjectRepository(Employee) private employeeRepository: Repository<Employee>,
    @InjectRepository(Location) private locationRepository: Repository<Location>,
    @InjectRepository(User) private userRepository: Repository<User>){}

  //----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  async create(createEmployeeDto: CreateEmployeeDto) {
    const locationToLink = await this.locationRepository.findOneBy({
      locationId: createEmployeeDto.locationId
    });
    const userToLink = await this.userRepository.findOneBy({
      userId: createEmployeeDto.userId
    });
    if (!locationToLink) throw new NotFoundException(`Location with ID ${createEmployeeDto.locationId} not found`);
    else if (!userToLink) throw new NotFoundException(`User with ID ${createEmployeeDto.userId} not found`);
    const employeeToSave = {
      ...createEmployeeDto,
      location: locationToLink,
      user: userToLink
    };
    return await this.employeeRepository.save(employeeToSave);
  }

  //----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  async findAll() {
    return await this.employeeRepository.find({
      relations: ['user','location']  // ← ¡Esto carga la relación!
    });
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

  findByLocation(locationId: number){
    
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
