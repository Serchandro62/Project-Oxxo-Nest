import { ConflictException, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { QueryFailedError, Repository } from 'typeorm';
import bcrypt from "bcrypt";
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from './dto/login-user.dto';


@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    //inyectado desde el contenedor. Subido al contenedor desde user.module
    private jwtService: JwtService) { }

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

  async loginUser(LoginUserDto: LoginUserDto) {
    const user = await this.userRepository.findOneBy({
      userEmail: LoginUserDto.userEmail
    })
    if (!user) throw new NotFoundException
    const match = await bcrypt.compare(LoginUserDto.userPassword, user.userPassword); 
    if (!match) throw new UnauthorizedException('Credenciales inválidas');
    //si sí hubi match... 
    const payload = { //creamos un objeto que tiene 2 datos de nuestro usuario
      user: user.userEmail,
      password: user.userPassword
    }
    return this.jwtService.sign(payload); //lo mandamos al payload del jwt. 
    /**
     * jwtService es una instancia de JwtService, que viene inyectado (comportamiento default JwtService) desde user.module, donde
     * viene indicado qué "secret" usa y demás. Como es "injectable" por default, lo pudimos inyectar al constructor desde el contenedor. 
     */
  }

}
