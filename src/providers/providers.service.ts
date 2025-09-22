import { Injectable } from '@nestjs/common';
import { CreateProviderDto } from './dto/create-provider.dto';
import { UpdateProviderDto } from './dto/update-provider.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Provider } from './entities/provider.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProvidersService {

  constructor(@InjectRepository(Provider) private providerRepository: Repository<Provider>){}

  async create(createProviderDto: CreateProviderDto) {
    return await this.providerRepository.save(createProviderDto);
  }

  async findAll() {
    return await this.providerRepository.find();
  }

  findOne(id: string) {
    return `This action returns a #${id} provider`;
  }

  update(id: string, updateProviderDto: UpdateProviderDto) {
    return `This action updates a #${id} provider`;
  }

  remove(id: string) {
    return `This action removes a #${id} provider`;
  }
}
