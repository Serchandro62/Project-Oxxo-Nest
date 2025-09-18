import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmployeesModule } from './employees/employees.module';
import { ProductsModule } from './products/products.module';
import { ConfigModule } from '@nestjs/config'; //Permite leer variables de entorno .env y proporciona el servicio ConfigService (que provee valores por defecto, tipados, etc)

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}), //No necesitas importar ConfigModule en cada módulo donde quieras usar ConfigService. Ya está disponible en todo el proyecto automáticamente.
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
