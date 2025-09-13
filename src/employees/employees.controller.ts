import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';

@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  /**
   * Es importante notar que, aunque la petición no venga con el formato correcto de CreateEmployeeDto
   * sí será procesada. A diferencia de Java, el chequeo de tipos en TS solo se hace durante desarrollo
   * y acba una vez que entramos a RunTime, en donde ya fue transpilado a JS (no hay tipos).
   * Dado que la petición se hace en RunTime, el tipado no tiene utilidad en ese momento. Sin validadores
   * adicionales, no hay control.
   */

  @Post()
  create(@Body() createEmployeeDto: CreateEmployeeDto) {
    return this.employeesService.create(createEmployeeDto);
  }

  @Get()
  findAll() {
    return this.employeesService.findAll();
  }

  @Get(':id') //Parámetro dinámico. Un placeholder después de "employees" que será interpetado como id
  //Param sirve para acceder a algun lado de la URL. En este caso quiere acceder al que llamamos "id" según el get de arriba
  findOne(@Param('id',new ParseUUIDPipe({version: '4'})) id: string) {
    /**
     * El segundo parámetro de @Param es una instancia de una pipe. Al 2° es donde siempre se pasan los 
     * valores antes que nada. Si todo jala, ya se pone como parámetro de función id:string. 
     * Si no, NestJS devuelve 400 Bad Request automáticamente y tu método nunca se ejecuta.
     */
    return this.employeesService.findOne(id); 
  }

    /**
   * Anteriormente dije que, dado que se transpila a JS en runtime, no había problemas con 
   * el formato de las peticiones. Pero pensemos a futuro, cuando haya classValidators y demás. Pensando
   * en eso, usamos UpdateEmployeeDto, para que en un patch, podamos mandar un cuerpo que no es exactamente
   * el mismo declarado en CreateEmployeeDto (es decir, un solo atributo, no todo el cuerpo). 
   */
  @Patch(':id')
  update(@Param('id',new ParseUUIDPipe({version: '4'})) id: string, @Body() updateEmployeeDto: UpdateEmployeeDto) {
    return this.employeesService.update(id, updateEmployeeDto);
  }

  @Delete(':id')
  remove(@Param('id',new ParseUUIDPipe({version: '4'})) id: string) {
    return this.employeesService.remove(id);
  }
}
