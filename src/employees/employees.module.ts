import { Module } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { EmployeesController } from './employees.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employee } from './entities/employee.entity';

@Module({
  /**
   * Hace disponible el repositorio de Employee para inyección de dependencias
   * Permite usar @InjectRepository(Employee) en los servicios del módulo
   * Configura la conexión con la tabla de productos en la base de datos
   */
  imports: [TypeOrmModule.forFeature([Employee])],
  controllers: [EmployeesController],
  providers: [EmployeesService],
})
export class EmployeesModule {}
