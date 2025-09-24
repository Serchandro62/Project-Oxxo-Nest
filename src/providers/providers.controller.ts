import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, UseGuards, UnauthorizedException } from '@nestjs/common';
import { ProvidersService } from './providers.service';
import { CreateProviderDto } from './dto/create-provider.dto';
import { UpdateProviderDto } from './dto/update-provider.dto';
import { AuthGuard } from 'src/user/guards/auth.guard';
import { UserData } from 'src/user/decorators/user.decorator';
import { User } from 'src/user/entities/user.entity';

@UseGuards(AuthGuard) //Para mandar tu bearer token (jwt) tendrías que mandar un cuerpo de authorizaton->bearer token en postman. Recuerda la caducidad. 
@Controller('providers')
export class ProvidersController {
  constructor(private readonly providersService: ProvidersService) {}

  @Post()
  create(@Body() createProviderDto: CreateProviderDto) {
    return this.providersService.create(createProviderDto);
  }

  @Get()
  //Recuerda que @UserData devuelve el payload creado en user.login
  findAll(@UserData() user: User) { //Estando en un controller, TS no puede ver qué devuelve un decorador, porque vienen de parte de NestJS, no de TS. 
    if(user.userRoles.includes("Employee")) throw new UnauthorizedException("No estás autorizado. Solo admins");
    console.log(user.userId); // --> undefined, porque no es un User real
    //TS no puede saber que lo que devuelve @UserData no es convertible a un tipo User. Y en runtime JS lo hace sin preguntar. Ya no hay tipos
    //Por eso aquí no salta ninguna advertencia, pero ese user no es un User real. 
    return this.providersService.findAll();
    /**
     * Si el payload no tuviera NADA que ver con la estructura de un user, TS no tendría forma de saberlo 
     * porque viene dado por el decorador (que no sabe revisar). De hecho si el payload fueran locuras, pero no 
     * se verifica ningún miembro (como sí hacemos con "includes"), también saldría bien todo. 
     */
  }

  @Get(':id')
  findOne(@Param('id', new ParseUUIDPipe({version: '4'})) id: string) {
    return this.providersService.findOne(id);
  }

  @Get('/name/:name')
  findByName(@Param('name') name: string){
    return this.providersService.findByName(name);
  }

  @Patch(':id')
  update(@Param('id', new ParseUUIDPipe({version: '4'})) id: string, @Body() updateProviderDto: UpdateProviderDto) {
    return this.providersService.update(id, updateProviderDto);
  }

  @Delete(':id')
  remove(@Param('id', new ParseUUIDPipe({version: '4'})) id: string) {
    return this.providersService.remove(id);
  }
}
