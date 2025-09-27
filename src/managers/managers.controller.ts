import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { ManagersService } from './managers.service';
import { CreateManagerDto } from './dto/create-manager.dto';
import { UpdateManagerDto } from './dto/update-manager.dto';
import { Auth } from 'src/user/decorators/auth.decorator';
import { ROLES } from 'src/user/constants/roles.constants';
import { ApiAuth } from 'src/user/decorators/api.decorator';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Manager } from './entities/manager.entity';

@ApiAuth()
@ApiTags('Managers')
@Controller('managers')
export class ManagersController {
  constructor(private readonly managersService: ManagersService) {}

  @Auth([])
  @Post()
  @ApiResponse({
      status: 201,
      example: {
        managerId: "UUID",
        managerFullName: "Alberto Caparia",
        managerSalary: 34.30,
        managerEmail: "alca@gmail.com",
        managerPhoneNumber: "345678"
      } as Manager
    })
  create(@Body() createManagerDto: CreateManagerDto) {
    return this.managersService.create(createManagerDto);
  }

  @Auth([])
  @Get()
  @ApiResponse({
      status: 201,
      example: {
        managerId: "UUID",
        managerFullName: "Alberto Caparia",
        managerSalary: 34.30,
        managerEmail: "alca@gmail.com",
        managerPhoneNumber: "345678"
      } as Manager
    })
  findAll() {
    return this.managersService.findAll();
  }

  @Auth([])
  @Get(':id')
  @ApiResponse({
      status: 201,
      example: {
        managerId: "UUID",
        managerFullName: "Alberto Caparia",
        managerSalary: 34.30,
        managerEmail: "alca@gmail.com",
        managerPhoneNumber: "345678"
      } as Manager
    })
  findOne(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.managersService.findOne(id);
  }

  @Auth([ROLES.MANAGER])
  @ApiResponse({
      status: 201,
      example: {
        managerId: "UUID",
        managerFullName: "Alberto Caparia",
        managerSalary: 34.30,
        managerEmail: "alca@gmail.com",
        managerPhoneNumber: "345678"
      } as Manager
    })
  @Patch(':id')
  update(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string, @Body() updateManagerDto: UpdateManagerDto) {
    return this.managersService.update(id, updateManagerDto);
  }

  @Auth([])
  @Delete(':id')
  remove(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.managersService.remove(id);
  }
}
