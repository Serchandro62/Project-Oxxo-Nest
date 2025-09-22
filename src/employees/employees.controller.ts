import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { EmployeesService } from './employees.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';

@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) { }

  /**
   * @UseInterceptors--> Aplica uno o más interceptores a un controlador o método específico.
   * Nota: Existen formatos de petición HTTP alternos al JSON, como los "multipart/form-data" (Formato para enviar archivos y datos juntos en una petición)
   * 'request' es un objeto global de Express que contiene TODA la información de una petición
   * 'request.file' es una propiedad que Multer (una librería que maneja archivos) añade al request
   * FileInterceptor('file') --> En el body de un "multipart/form-data", busca el campo llamado 'file' (en este caso) y se lo pasa a Multer para que lo guarde en request.file
   * @UploadedFile--> Busca en request.file lo guardado. En este caso lo guardará en una variable que tiene el tipo que Multer le da a los archivos. 
   */

  /**FileInterceptor(
  fieldName: string, 
  options: MulterOptions // ← dest va aquí
  ) 
  Esta es la estructura de FilteInterceptor. El segundo parámetro es un arreglo de instrucciones para Multer*/

  /**
   * Estructura de Express.Multer.File:
   * {
   *   fieldname: 'file',           // Nombre del campo en el formulario
   *   originalname: 'imagen.png',  // Nombre original del archivo
   *   encoding: '7bit',            // Codificación
   *   mimetype: 'image/png',       // Tipo MIME
   *   buffer: <Buffer ...>,        // Contenido del archivo en bytes
   *   size: 1024                   // Tamaño en bytes
   * }
   */
  @Post('upload')
  @UseInterceptors(FileInterceptor('file',{
    dest: "./src/employees/employees-photos"
  }))
  uploadPhoto(@UploadedFile() file: Express.Multer.File) {
    return "Ok";
  }

  //----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  @Post()
  create(@Body() createEmployeeDto: CreateEmployeeDto) {
    return this.employeesService.create(createEmployeeDto);
  }

  //----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  @Get()
  findAll() {
    return this.employeesService.findAll();
  }

  //----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  @Get(':id')
  findOne(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.employeesService.findOne(id);
  }

  //----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  @Patch(':id')
  update(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string, @Body() updateEmployeeDto: UpdateEmployeeDto) {
    return this.employeesService.update(id, updateEmployeeDto);
  }

  //----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  @Delete(':id')
  remove(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.employeesService.remove(id);
  }
}
