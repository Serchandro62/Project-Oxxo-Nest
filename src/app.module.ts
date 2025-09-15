import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmployeesModule } from './employees/employees.module';
import { ProductsModule } from './products/products.module';
import { ConfigModule } from '@nestjs/config'; //Carga variables de entorno desde un archivo .env o directamente del entorno del sistema.

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}), // así no tienes que importarlo en cada módulo
    TypeOrmModule.forRoot({ //se encarga de configurar la conexión global a la base de datos de TypeORM para toda tu aplicación.
    type: 'postgres',
    host: process.env.host,
    port: Number(process.env.port),
    username: 'postgres',
    password: process.env.pass,
    database: process.env.name,
    entities: [],
    autoLoadEntities: true,
    synchronize: true,
  }),
    EmployeesModule,
    ProductsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
