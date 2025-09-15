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


  private products: CreateProductDto[] = [
    {
      productId: uuid(),
      productName: "Sabritas Normal 48g",
      price: 29,
      countSeal: 3,
      provider: uuid()
    }, {
      productId: uuid(),
      productName: "Coca Cola 600ml",
      price: 40,
      countSeal: 2,
      provider: uuid()
    }, {
      productId: uuid(),
      productName: "Agua Ciel 1L",
      price: 15,
      countSeal: 2,
      provider: uuid()
    }
  ]

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
  }

  findAll() {
    return this.productRepository.find();
  }

  findOne(id: string) {
    const product = this.products.find(product => product.productId === id);
    if (!product) throw new NotFoundException();
    return product;
  }

  findByProvider(id: string) {

    const providerProducts = this.products
      .filter(product => product.provider === id) // devuelve createProductDto[]
      .map(product => product.productName); //al arreglo de productos que tenemos, les saca su productName

    return providerProducts;
  }

  update(id: string, updateProductDto: UpdateProductDto) {
    let productToUpdate = this.findOne(id);
    //let productToUpdate = this.products.find(product => product.productId === id); 
    /**
     * podríamos hacer esto, pero entonces TS no tendría seguro si se encontró un producto o no, y marcará
     * error en el spread de abajo. Pero si usamos la función findOne, ya se maneja un error en caso de que sea 
     * vacío.
     */
    productToUpdate = {
      ...productToUpdate,
      ...updateProductDto
    }
    this.products = this.products.map((product) => {
      if (product.productId === id) {
        product = productToUpdate;
      }
      return product;
    });
    return productToUpdate;
  }

  remove(id: string) {
    const { productId } = this.findOne(id); //obtiene un atributo del objeto
    this.products = this.products.filter(product => product.productId !== productId)
    return this.products;
  }
}
