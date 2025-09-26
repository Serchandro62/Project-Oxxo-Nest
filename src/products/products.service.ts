import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryFailedError, Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { Provider } from 'src/providers/entities/provider.entity';

@Injectable()
export class ProductsService {

  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>,
    @InjectRepository(Provider) private providerRepository: Repository<Provider>) { }
  //Tuvimos que añadir un repositorio para providers para poder hacer la relación manualmente. Ya lo importamos en el module igual

  //----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  async create(createProductDto: CreateProductDto) {
    let providerToLink;
    if (createProductDto.providerId) {
      providerToLink = await this.providerRepository.findOneBy({
        providerId: createProductDto.providerId
      });
      if (!providerToLink) throw new NotFoundException(`Provider with ID ${createProductDto.providerId} not found`);
    }
    const productToSave = {
      ...createProductDto,
      provider: providerToLink
    };
    try {
      return await this.productRepository.save(productToSave);
    } catch (error) {
      if (error instanceof QueryFailedError) {
        if ((error as any).code === '23505') { // 23505 = unique_violation en Postgres
          throw new ConflictException('Product with this name already exists');
        }
      }
      throw new InternalServerErrorException('User creation failed');
    }
  }

  //----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  async findAll() {
    return await this.productRepository.find();
  }

  //----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  async findOne(id: string) {
    const product = await this.productRepository.findOneBy({
      productId: id
    });
    if (!product) throw new NotFoundException();
    return product;
  }

  //----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  async findByProviderId(id: string) {
    //Busca un producto que, en su atributo "provider", tenga un objeto cuyo atributo "providerId" sea el id buscado
    return await this.productRepository.findBy({
      provider: {
        providerId: id
      }
    })
  }

  //----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  async update(id: string, updateProductDto: UpdateProductDto) {
    const productToUpdate = await this.productRepository.preload({
      productId: id,
      ...updateProductDto
    });
    if (!productToUpdate) throw new NotFoundException(`Product with ID ${id} not found`);
    //DIferencia con otros update////////
    if (updateProductDto.providerId) { //Si lo que queremos modificar tiene un providerId, encontramos el nuevo proveedor y lo metemos a lo que guardaremos
      const providerToLink = await this.providerRepository.findOneBy({
        providerId: updateProductDto.providerId
      });
      if (!providerToLink) {
        throw new NotFoundException(`Provider with ID ${updateProductDto.providerId} not found`);
      }
      productToUpdate.provider = providerToLink;
    }
    ///////////////////////////////////
    return await this.productRepository.save(productToUpdate);
  }

  //----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  async remove(id: string) {
    const result = await this.productRepository.delete({
      productId: id
    });
    if (result.affected === 0) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return { message: `Product with ID ${id} deleted successfully` };
  }
}
