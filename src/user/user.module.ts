import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { EXPIRES_IN, JWT_KEY } from './constants/jwt.constants';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),

    //Cada módulo que importa JwtModule.register() crea su PROPIA instancia de JwtService con su propia configuración.
    //Al crear un JwtModule.register(), automáticamente se sube al contenedor, disponible para todo este módulo. 
    JwtModule.register({ //configura el módulo de JWT (JSON Web Token) en tu aplicación NestJS.
      secret: JWT_KEY, //establecemos la secret_key del jwt desde aquí. 
      signOptions: { //Este objeto configura las opciones al momento de crear un token.
        expiresIn: EXPIRES_IN
      }
    })


  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
