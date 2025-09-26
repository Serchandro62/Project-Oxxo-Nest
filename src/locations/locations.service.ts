import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryFailedError, Repository } from 'typeorm';
import { Location } from './entities/location.entity';
import { Region } from 'src/regions/entities/region.entity';
import { Manager } from 'src/managers/entities/manager.entity';

@Injectable()
export class LocationsService {

  constructor(@InjectRepository(Location) private locationRepository: Repository<Location>,
    @InjectRepository(Region) private regionRepository: Repository<Region>,
    @InjectRepository(Manager) private managerRepository: Repository<Manager>) { }

  async create(createLocationDto: CreateLocationDto) {
    let regionToLink;
    let managerToLink;
    if (createLocationDto.regionId) {
      regionToLink = await this.regionRepository.findOneBy({
        regionId: createLocationDto.regionId
      });
      if (!regionToLink) throw new NotFoundException(`Region with ID ${createLocationDto.regionId} not found`);
    }
    if (createLocationDto.managerId) {
      managerToLink = await this.managerRepository.findOneBy({
        managerId: createLocationDto.managerId
      });
      if (!managerToLink) throw new NotFoundException(`Manager with ID ${createLocationDto.managerId} not found`);
    }
    const locationToSave = {
      ...createLocationDto,
      region: regionToLink,
      manager: managerToLink
    }
    try {
      return await this.locationRepository.save(locationToSave);
    } catch (error) {
      if (error instanceof QueryFailedError) {
        if ((error as any).code === '23505') { // 23505 = unique_violation en Postgres
          throw new ConflictException('Location with these coordinates already exists');
        }
      }
      throw new InternalServerErrorException('User creation failed');
    }
  }

  //----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  async findAll() {
    return await this.locationRepository.find();
  }

  //----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  async findOne(id: number) {
    const location = await this.locationRepository.findOneBy({
      locationId: id
    })
    if (!location) throw new NotFoundException
    return location;
  }

  //----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  async update(id: number, updateLocationDto: UpdateLocationDto) {
    const locationToUpdate = await this.locationRepository.preload({
      locationId: id,
      ...updateLocationDto
    })
    if (!locationToUpdate) throw new NotFoundException();
    //==============================================
    if (updateLocationDto.regionId) {
      const regionToUpdate = await this.regionRepository.findOneBy({ regionId: updateLocationDto.regionId })
      if (!regionToUpdate) throw new NotFoundException(`Region with ID ${updateLocationDto.regionId} not found`)
      locationToUpdate.region = regionToUpdate
    }
    if (updateLocationDto.managerId) {
      const managerToUpdate = await this.managerRepository.findOneBy({ managerId: updateLocationDto.managerId })
      if (!managerToUpdate) throw new NotFoundException(`Manager with ID ${updateLocationDto.managerId} not found`)
      locationToUpdate.manager = managerToUpdate
    }
    //==============================================
    return await this.locationRepository.save(locationToUpdate);
  }

  //----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  async remove(id: number) {
    const locationRemoved = await this.locationRepository.delete({
      locationId: id
    })
    if (locationRemoved.affected == 0) {
      throw new NotFoundException(`Location with ID ${id} not found`);
    }
    return `Location with ID ${id} deleted successfully!`;
  }
}
