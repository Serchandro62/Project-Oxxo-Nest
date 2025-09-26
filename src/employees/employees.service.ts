import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from './entities/employee.entity';
import { QueryFailedError, Repository } from 'typeorm';
import { Location } from 'src/locations/entities/location.entity';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class EmployeesService {

  constructor(
    @InjectRepository(Employee) private employeeRepository: Repository<Employee>,
    @InjectRepository(Location) private locationRepository: Repository<Location>,
    @InjectRepository(User) private userRepository: Repository<User>) { }

  //----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  async create(createEmployeeDto: CreateEmployeeDto) {
    let locationToLink;
    let userToLink;
    if(createEmployeeDto.locationId){
      locationToLink = await this.locationRepository.findOneBy({
        locationId: createEmployeeDto.locationId
      });
      if (!locationToLink) throw new NotFoundException(`Location with ID ${createEmployeeDto.locationId} not found`);
    }
    if(createEmployeeDto.userId){
      userToLink = await this.userRepository.findOneBy({
        userId: createEmployeeDto.userId
      });
      if (!userToLink) throw new NotFoundException(`User with ID ${createEmployeeDto.userId} not found`);
    }
    const employeeToSave = {
      ...createEmployeeDto,
      location: locationToLink,
      user: userToLink
    };
    try {
      return await this.employeeRepository.save(employeeToSave);
    } catch (error) {
      if (error instanceof QueryFailedError) {
        if ((error as any).code === '23505') { // 23505 = unique_violation en Postgres
          throw new ConflictException('Employee with this email already exists');
        }
      }
      console.log(error)
      throw new InternalServerErrorException('User creation failed');
    }
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
    if (!employee) throw new NotFoundException();
    return employee;
  }

  //----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  async findByLocation(locationId: number) {
    return await this.employeeRepository.findBy({
      location: {
        locationId: locationId
      }
    })
  }

  //----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  async update(id: string, updateEmployeeDto: UpdateEmployeeDto) {
    const employeeToUpdate = await this.employeeRepository.preload({
      employeeId: id,
      ...updateEmployeeDto
    })
    if (!employeeToUpdate) throw new NotFoundException();
    //==============================================
    if(updateEmployeeDto.locationId){
      const locationToUpdate = await this.locationRepository.findOneBy({locationId: updateEmployeeDto.locationId})
      if(!locationToUpdate) throw new NotFoundException(`Location with ID ${updateEmployeeDto.locationId} not found`)
      employeeToUpdate.location = locationToUpdate
    }
    if(updateEmployeeDto.userId){
      const userToUpdate = await this.userRepository.findOneBy({userId: updateEmployeeDto.userId})
      if(!userToUpdate) throw new NotFoundException(`User with ID ${updateEmployeeDto.userId} not found`)
      employeeToUpdate.user = userToUpdate
    }
    //==============================================
    return await this.employeeRepository.save(employeeToUpdate);
  }

  //----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  async remove(id: string) {
    const result = await this.employeeRepository.delete({
      employeeId: id
    });
    if (result.affected === 0) {
      throw new NotFoundException(`Employee with ID ${id} not found`);
    }
    return { message: `Employee with ID ${id} deleted successfully` };
  }
}
