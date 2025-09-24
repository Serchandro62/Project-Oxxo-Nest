import { ConflictException, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { QueryFailedError, Repository } from 'typeorm';
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';


@Injectable()
export class UserService {

  constructor(@InjectRepository(User) private userRepository: Repository<User>) { }

  //---------------------------------------------------------------------------------------------------------------------------------------------------------------

  async registerUser(createUserDto: CreateUserDto) {
    try {
      createUserDto.userPassword = await bcrypt.hash(createUserDto.userPassword, 10);
      return await this.userRepository.save(createUserDto);
    } catch (error) {
      if (error instanceof QueryFailedError) {
        if ((error as any).code === '23505') { // 23505 = unique_violation en Postgres
          throw new ConflictException('User with this email already exists');
        }
      }
      throw new InternalServerErrorException('User creation failed');
    }
  }

  //---------------------------------------------------------------------------------------------------------------------------------------------------------------

  async loginUser(createUserDto: CreateUserDto) {
    const user = await this.userRepository.findOneBy({
      userEmail: createUserDto.userEmail
    })
    if (!user) throw new NotFoundException
    const match = await bcrypt.compare(createUserDto.userPassword, user.userPassword); 
    if (!match) throw new UnauthorizedException('No estás autorizado');
    return jwt.sign(JSON.stringify(user),"SECRET KEY"); //Si todo salió bien le damos su token
    //el primer parámetro tiene que ser un JSON, no un objeto. Por eso lo convertimos. 

    /**
    * JWT No es por seguridad, solo es para validar que ningún contenido se ha modificado. Si algo del cuerpo se modifica,
    * entonces la signature ya no es correcta. 
    */

    /**
     * entonces la generación de un jwt es:
     * base64(header).base64(payload).base64(signature)
     * donde signature es:
     * hmacsha[x]
     * donde x = mezcla de ((a + b), c) donde c es algo como la "salt" del hasheo, pero constante 
     * donde a = base64(header)
     * b = base64(payload)
     * c = secret
     * 
     * Entonces cuando toca validarlo, tomas el "b64(header).b64(payload)", lo metes al hmacsha(AQUI,secret) y lo b64amos, y si sale igual, todo cuadra. 
     */
  }

}
