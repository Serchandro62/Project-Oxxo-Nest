import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';

@Module({
  /**
   * Hace disponible el repositorio de Product para inyección de dependencias
   * Permite usar @InjectRepository(Product) en los servicios del módulo
   * Configura la conexión con la tabla de productos en la base de datos
   */
  imports: [TypeOrmModule.forFeature([Product])],
  
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
