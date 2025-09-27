import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { EmployeesService } from './employees.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { Auth } from 'src/user/decorators/auth.decorator';
import { ROLES } from 'src/user/constants/roles.constants';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Employee } from './entities/employee.entity';
import { ApiAuth } from 'src/user/decorators/api.decorator';

@ApiAuth()
@ApiTags('Employees')
@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) { }
  
  @Auth([ROLES.MANAGER, ROLES.EMPLOYEE])
  @Post('upload')
  @UseInterceptors(FileInterceptor('file',{
    dest: "./src/employees/employees-photos"
  }))
  uploadPhoto(@UploadedFile() file: Express.Multer.File) {
    return "Ok";
  }

  //----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  @Auth([ROLES.MANAGER])
  @ApiResponse({
    status: 201,
    example:{  
      employeeId: "UUID",
      employeeName: "Serch",
      employeeLastName: "Arte",
      employeePhoneNumber: "4425039283",
      employeeEmail: "sear@gmail.com"
    } as Employee
  })
  @Post()
  create(@Body() createEmployeeDto: CreateEmployeeDto) {
    return this.employeesService.create(createEmployeeDto);
  }

  //----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  @Auth([ROLES.MANAGER])
  @Get()
  @Auth([ROLES.MANAGER])
  @ApiResponse({
    status: 201,
    example:{  
      employeeId: "UUID",
      employeeName: "Serch",
      employeeLastName: "Arte",
      employeePhoneNumber: "4425039283",
      employeeEmail: "sear@gmail.com"
    } as Employee
  })
  findAll() {
    return this.employeesService.findAll();
  }

  //----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  @Auth([ROLES.MANAGER])
  @Get(':id')
  @Auth([ROLES.MANAGER])
  @ApiResponse({
    status: 201,
    example:{  
      employeeId: "UUID",
      employeeName: "Serch",
      employeeLastName: "Arte",
      employeePhoneNumber: "4425039283",
      employeeEmail: "sear@gmail.com"
    } as Employee
  })
  findOne(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.employeesService.findOne(id);
  }

  //----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  @Auth([ROLES.MANAGER])
  @Get('/location/:id')
  @Auth([ROLES.MANAGER])
  @ApiResponse({
    status: 201,
    example:{  
      employeeId: "UUID",
      employeeName: "Serch",
      employeeLastName: "Arte",
      employeePhoneNumber: "4425039283",
      employeeEmail: "sear@gmail.com"
    } as Employee
  })
  findByLocation(@Param ('id') locationId: string){
    return this.employeesService.findByLocation(+locationId);
  }

  //----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  @Auth([ROLES.MANAGER, ROLES.MANAGER])
  @Patch(':id')
  @Auth([ROLES.MANAGER])
  @ApiResponse({
    status: 201,
    example:{  
      employeeId: "UUID",
      employeeName: "Serch",
      employeeLastName: "Arte",
      employeePhoneNumber: "4425039283",
      employeeEmail: "sear@gmail.com"
    } as Employee
  })
  update(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string, @Body() updateEmployeeDto: UpdateEmployeeDto) {
    return this.employeesService.update(id, updateEmployeeDto);
  }

  //----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  @Auth([ROLES.MANAGER])
  @Delete(':id')
  @Auth([ROLES.MANAGER])
  remove(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.employeesService.remove(id);
  }
}
