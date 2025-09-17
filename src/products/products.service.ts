import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { v4 as uuid } from 'uuid';
import { NotFoundError } from 'rxjs';
import { Employee } from 'src/employees/entities/employee.entity';
import { prependListener } from 'process';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {

  /**
   * constructor(...) - Define el constructor de la clase
   * @InjectRepository(Product) - Decorador de NestJS que:
   * Indica que se debe inyectar un repositorio de TypeORM
   * Product especifica la entidad para la cual se crea el repositorio
   * private productRepository - Declara una propiedad privada llamada productRepository
   * Repository<Product> - Tipo TypeScript que indica que es un repositorio para la entidad Product
   */
  constructor(@InjectRepository(Product) private productRepository: Repository<Product>) { }

  //recuerda que el "await" desenvuelve el valor de su promesa

  async create(createProductDto: CreateProductDto) {
    // const product = this.productRepository.create(createProductDto); //crea instancia new Product() porque el puro createProductDto puede tener varias propiedades faltantes ya que son @IsOptional
    // const savedProduct = await this.productRepository.save(product); // ahora si lo aguardamos ya completo. 
    // return savedProduct; // ← Retorna lo que persistió la BD que, a diferencia de "product", sí tiene: 
    /**
     * Con ID: Incluye el ID autoincremental generado por la base de datos
     * Datos completos: Trae todos los valores default, timestamps, etc.
     * Confirmación: Sabes que realmente se guardó exitosamente
     */
    ///////////////////////////////////////////////////////Pero lo podemos resumir así: 
    return await this.productRepository.save(createProductDto);
    // TypeORM automáticamente llama a create() internamente
    //el método save() de un objeto de tipo Repository<> devuelve automáticamente lo que guardó. Por eso lo podíamos guardar en una variable
    //Lo que devuelve es de tipo Promise<Product>
  }

  async findAll() {
    return await this.productRepository.find();
    //Lo que devuelve es de tipo Promise<Product[]>
  }

  async findOne(id: string) {
    const product = await this.productRepository.findOneBy({
      productId: id
    });
    //Lo que devuelve es de tipo Promise<Product | null>
    if(!product) throw new NotFoundException();
    return product;
  }

  findByProvider(id: string) {

  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    /**
     * Busca en la base de datos la entidad con el ID proporcionado
     * Carga todos los campos de la entidad existente
     * Reemplaza los campos con los valores del objeto plano
     * Retorna la entidad modificada pero NO guardada
     */
    const productToUpdate = await this.productRepository.preload({
      productId: id,
      ...updateProductDto
    })
    if(!productToUpdate) throw new NotFoundException();
    await this.productRepository.save(productToUpdate);
    return productToUpdate;
  }

  async remove(id: string) {
    const result = await this.productRepository.delete({
      productId: id
    });
    //Lo que devuelve es de tipo Promise<DeleteResult>, porque una vez eliminado, el registro no debería existir en tu aplicación
    //afected es un atirbuto que dice cuántos eliminó
    if (result.affected === 0) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return { message: `Product with ID ${id} deleted successfully` };
  }
}
