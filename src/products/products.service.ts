import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { v4 as uuid } from 'uuid';
import { NotFoundError } from 'rxjs';
import { Employee } from 'src/employees/entities/employee.entity';
import { prependListener } from 'process';

@Injectable()
export class ProductsService {

  private products: CreateProductDto[] = [
    {
      productId: uuid(),
      productName: "Sabritas Normal 48g",
      price: 29,
      countSeal: 3,
      provider: uuid()
    },{
      productId: uuid(),
      productName: "Coca Cola 600ml",
      price: 40,
      countSeal: 2,
      provider: uuid()
    },{
      productId: uuid(),
      productName: "Agua Ciel 1L",
      price: 15,
      countSeal: 2,
      provider: uuid()
    }
  ]

  create(createProductDto: CreateProductDto) {
    if(!createProductDto.productId) createProductDto.productId = uuid();
    this.products.push(createProductDto);
    return "Product has been added successfully"
  }

  findAll() {
    return this.products;
  }

  findOne(id: string) {
    const product = this.products.find(product => product.productId === id);
    if(!product) throw new NotFoundException();
    return product;
  }

  findByProvider(id: string){

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
    this.products = this.products.map((product)=>{
      if(product.productId === id){
        product = productToUpdate;
      } 
      return product;
    });
    return productToUpdate;
  }

  remove(id: string) {
    const {productId} = this.findOne(id); //obtiene un atributo del objeto
    this.products = this.products.filter(product => product.productId !== productId)
    return this.products;
  }
}
