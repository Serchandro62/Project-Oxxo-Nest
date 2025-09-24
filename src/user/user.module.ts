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

    
    JwtModule.register({ 
      secret: JWT_KEY, 
      signOptions: { 
        expiresIn: EXPIRES_IN
      },
      global: true 
      /**
       * Con esta nueva configuración, el módulo ya no solo se sube al contenedor de éste módulo, sino al global.
       * Es decir, ahora, sin necesidad de importarlo y configurarlo en otros módulos, todos usarán este mismo. 
       */
    })


  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
