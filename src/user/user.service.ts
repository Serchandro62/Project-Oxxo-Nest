import { ConflictException, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { QueryFailedError, Repository } from 'typeorm';
import bcrypt from "bcrypt";


@Injectable()
export class UserService {

  constructor(@InjectRepository(User) private userRepository: Repository<User>){}
  /**
   * El segundo parámetro de hash es costo: Es qué tan "profundo" se hashea. Los hackers buscan una palabra e intentan hashearla. Si el resultado es igual
   * entonces saben la palabra original+salt. Mientras más profundo se hashea, más tiempo le toma al hacker generar cada intento. 
   */
  //El "salt" es una cadena aleatoria que se genera y se añade a la contraseña antes de hashearla. Sin esto, 2 contraseñas iguales tendrían el mismo hasheo si tienen la misma "profundidad".
  //Para producir un mismo hash se necesita: <contraseña + salt + coste> correctos. 
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
    // otros errores
    throw new InternalServerErrorException('User creation failed');
  }
}

  async loginUser(createUserDto: CreateUserDto){
    const user = await this.userRepository.findOneBy({
      userEmail: createUserDto.userEmail
    })
    if(!user) throw new NotFoundException
    /**
     * La "salt" y el coste vienen explícitamente en el resultado de un hasheo, de forma que se puede comparar una contraseña ingresada con la original.
     * Aún si el atacante logra ver el hasheo (que tiene la salt y coste), tiene que decifrar la cadena original, lo que le toma mucho tiempo (más si hay más coste)
     */
    const match = await bcrypt.compare(createUserDto.userPassword, user.userPassword); //match será booleano
    if(!match) throw new UnauthorizedException('No estás autorizado');
    return "OK"; //si no lanza excepción. 
  }

}
