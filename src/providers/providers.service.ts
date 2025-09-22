import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProviderDto } from './dto/create-provider.dto';
import { UpdateProviderDto } from './dto/update-provider.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Provider } from './entities/provider.entity';
import { Repository, Like } from 'typeorm';

@Injectable()
export class ProvidersService {

  constructor(@InjectRepository(Provider) private providerRepository: Repository<Provider>){}

  async create(createProviderDto: CreateProviderDto) {
    return await this.providerRepository.save(createProviderDto);
  }

  //----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  async findAll() {
    return await this.providerRepository.find();
  }

  //----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  async findOne(id: string) {
    const provider =  await this.providerRepository.findOneBy({
      providerId: id
    }) 
    if(!provider) throw new NotFoundException()
    return provider;
  }

  //----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  async findByName(name: string) {
    const provider =  await this.providerRepository.findBy({
      providerName: Like(`%${name}%`)
    }) 
    if(!provider) throw new NotFoundException()
    return provider;
  }

  //----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  async update(id: string, updateProviderDto: UpdateProviderDto) {
    const providerToUpdate = await this.providerRepository.preload({
      providerId: id,
      ...updateProviderDto
    });
    if(!providerToUpdate) throw new NotFoundException()
    return await this.providerRepository.save(providerToUpdate);
  }

  //----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  async remove(id: string) {
    const removed = await this.providerRepository.delete({
      providerId: id
    });
    if(removed.affected==0){
      throw new NotFoundException
    }
    return `The provider with ID ${id} has been successfully deleted`;
  }
}
