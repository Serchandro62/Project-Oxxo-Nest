import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmployeesModule } from './employees/employees.module';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [TypeOrmModule.forRoot({ //se encarga de configurar la conexión global a la base de datos de TypeORM para toda tu aplicación.
    type: 'postgres',
    host: process.env.host,
    port: +process.env.port!, //Con "!" le aseguramos que no será nulo 
    username: 'postgres',
    password: "TheBestPassword",
    database: process.env.name,
    entities: [],
    synchronize: true,
  }),
    EmployeesModule,
    ProductsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
