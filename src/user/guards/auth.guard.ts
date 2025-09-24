
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { JWT_KEY } from '../constants/jwt.constants';

@Injectable()
//Un guard es una clase que implementa la interfaz CanActivate. Básicamente checa si el tocken está intacto y lo pasa a request.user
export class AuthGuard implements CanActivate { //La interfaz CanActivate tiene un único método, canActivate(), que debe ser implementado.
  constructor(private jwtService: JwtService) {}    //Esta clase ya viene del contenedor por user.module global config. 

  /**
   * ExecutionContext: Su función principal es darte información contextual del request en curso. Todo el ciclo de vida del request. 
   * Contiene el request, el response, el handler y el controller.
   * → Response: NestJS mete, al final de todo, la response al ExecutionContext. 
   * → Handler: Enpoint que se ejecutará para esta request
   * → Controller: El controler que tiene ese handler 
   * pero con un extra: sabe en qué tipo de entorno se está ejecutando tu código (HTTP, WebSockets, gRPC, RPC, etc.)
   */
  async canActivate(context: ExecutionContext): Promise<boolean> {
    /**
     * switchToHttp() → fuerza el contexto a tratarlo como HTTP.
     * getRequest() →  ya dentro de HTTP, saca el objeto req nativo (Express/Fastify), que tiene el atributo user, body, params, headers, etc...
     */
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request); //declarado abajo. 
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
        //verifyAsync → La función garantiza que el token fue emitido por quien tiene la clave y que no fue modificado.
      const payload = await this.jwtService.verifyAsync(token,{secret: JWT_KEY}); //primer parámetro es el jwt, segundo tiene un objeto con configuraciones para la validacion
      request['user'] = payload; //Al atributo "user" de la request, se le asigna todo el payload decodificado
    } catch {
      throw new UnauthorizedException();
    }
    return true; //si no venía el token, chafea. Y luego, si sí venía pero no da buen verify, chafea. 
  }

  //-------------------------------------------------------------------------------------------------------------------------------------------

  private extractTokenFromHeader(request: Request): string | undefined {
    /**
     * Un header HTTP es un par clave-valor que viaja en la petición, por ejemplo:
      GET /users HTTP/1.1
      Host: api.example.com
      Content-Type: application/json
      Authorization: Bearer abc123  →→→ es parte del header estándar de HTTP, sirve para mandar credenciales.

     * const [type, token] → Está suponiendo que "authorization" serán 2 valores, así que el primero lo asigna a "type" y el segundo a "token"
     * si no existe esa propiedad, será un arreglo vacío. "type" y "token" serán undefined. 
     */
    const [type, token] = request.headers.authorization?.split(' ') ?? []; 
     /**
     * Cuando un header Authorization empieza con "Bearer", significa:
     * "Aquí te paso un token de acceso (generalmente un JWT) que me identifica/autoriza. Confía en él y dame acceso a los recursos protegidos”.
     */
    return type === 'Bearer' ? token : undefined; //Si type es 'Bearer', devuelve el token. Si no, devuelve undefined. 
  }
}
