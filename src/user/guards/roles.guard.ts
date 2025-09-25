import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Roles } from '../decorators/roles.decorator';
import { User } from '../entities/user.entity';
import { access } from 'fs';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get(Roles, context.getHandler()); //El primer parámetro busca la metadata ingresada por ese decorador a... lo que da el segundo parámetro
    //getHandler de un ExecutionContext te da la función a la que va la petición.
    if (!roles) { //Si la función no fue marcada con un rol (no exige uno en especial) entonces sí aprueba el guard. 
      return true;
    } else { //si sí pide roles... 
      const request = context.switchToHttp().getRequest(); 
      if (!request.user) throw new UnauthorizedException('User not authenticated'); //si no pasó por un AuthGuard primero para meter el payload a request.user
      const user: User = request.user; //Lo mismo que en endpoint findAll de provider. TS no sabe que request.user no es un User como tal. Solo asume y lo trata como tal JS en runtime por ducktyping. 
      return this.matchRoles(roles, user.userRoles); //verifica si algún role del usuario coincide con el que se pide
    }
  }
  matchRoles(roles: string[],userRoles: string[]){
    let access = false;
    userRoles.forEach((userRole)=>{
      if (roles.includes(userRole)) access = true;
    })
    return access;
  }
}
