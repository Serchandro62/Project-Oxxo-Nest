import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateManagerDto } from './dto/create-manager.dto';
import { UpdateManagerDto } from './dto/update-manager.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Manager } from './entities/manager.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ManagersService {

  constructor(@InjectRepository(Manager) private managerRepository: Repository<Manager>){}

  async create(createManagerDto: CreateManagerDto) {
    return await this.managerRepository.save(createManagerDto);
  }

  async findAll() {
    return await this.managerRepository.find();
  }

  async findOne(id: string) {
    const manager = await this.managerRepository.findOneBy({
      managerId: id
    })
    if(!manager) throw new NotFoundException
    return manager;
  }

  async update(id: string, updateManagerDto: UpdateManagerDto) {
    const managerToUpdate = await this.managerRepository.preload({
      managerId: id,
      ...updateManagerDto
    })
    if(!managerToUpdate) throw new NotFoundException
    return await this.managerRepository.save(managerToUpdate);
  }

  async remove(id: string) {
    const removed = await this.managerRepository.delete({
      managerId: id
    })
    if(removed.affected == 0) throw new NotFoundException
    return `Manager with ID ${id} has been deleted successfully!`;
  }
}
