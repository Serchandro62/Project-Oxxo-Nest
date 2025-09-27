import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, UseGuards, UnauthorizedException } from '@nestjs/common';
import { ProvidersService } from './providers.service';
import { CreateProviderDto } from './dto/create-provider.dto';
import { UpdateProviderDto } from './dto/update-provider.dto';
import { AuthGuard } from 'src/user/guards/auth.guard';
import { UserData } from 'src/user/decorators/user.decorator';
import { User } from 'src/user/entities/user.entity';
import { Roles } from 'src/user/decorators/roles.decorator';
import { RolesGuard } from 'src/user/guards/roles.guard';
import { Auth } from 'src/user/decorators/auth.decorator';
import { ROLES } from 'src/user/constants/roles.constants';
import { ApiAuth } from 'src/user/decorators/api.decorator';

@ApiAuth()
@Controller('providers')
export class ProvidersController {
  constructor(private readonly providersService: ProvidersService) {}

  @Auth([ROLES.MANAGER])
  @Post()
  create(@Body() createProviderDto: CreateProviderDto) {
    return this.providersService.create(createProviderDto);
  }

  @Get() 
  @Auth([ROLES.EMPLOYEE,ROLES.MANAGER])
  findAll(@UserData() user: User) {
    if(user.userRoles.includes("Employee")) throw new UnauthorizedException("No estás autorizado. Solo admins"); 
    return this.providersService.findAll();
  }

  @Auth([ROLES.EMPLOYEE,ROLES.MANAGER])
  @Get(':id')
  findOne(@Param('id', new ParseUUIDPipe({version: '4'})) id: string) {
    return this.providersService.findOne(id);
  }

  @Auth([ROLES.EMPLOYEE,ROLES.MANAGER])
  @Get('/name/:name')
  findByName(@Param('name') name: string){
    return this.providersService.findByName(name);
  }

  @Auth([ROLES.MANAGER])
  @Patch(':id')
  update(@Param('id', new ParseUUIDPipe({version: '4'})) id: string, @Body() updateProviderDto: UpdateProviderDto) {
    return this.providersService.update(id, updateProviderDto);
  }

  @Auth([ROLES.MANAGER])
  @Delete(':id')
  remove(@Param('id', new ParseUUIDPipe({version: '4'})) id: string) {
    return this.providersService.remove(id);
  }
}
