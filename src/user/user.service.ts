import { ConflictException, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { QueryFailedError, Repository } from 'typeorm';
import bcrypt from "bcrypt";
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from './dto/login-user.dto';
import { userInfo } from 'os';
import { Auth } from './decorators/auth.decorator';


@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private jwtService: JwtService) { }

  //---------------------------------------------------------------------------------------------------------------------------------------------------------------

  async findAll() {
    return await this.userRepository.find();
  }

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

  async loginUser(loginUserDto: LoginUserDto) {
    const user = await this.userRepository.findOneBy({
      userEmail: loginUserDto.userEmail
    })
    if (!user) throw new NotFoundException
    const match = await bcrypt.compare(loginUserDto.userPassword, user.userPassword);
    if (!match) throw new UnauthorizedException('Credenciales inválidas');
    const payload = {
      userEmail: user.userEmail,
      userPassword: user.userPassword,
      userRoles: user.userRoles
    }
    return this.jwtService.sign(payload); //haces login, te avienta un string token
  }

  //---------------------------------------------------------------------------------------------------------------------------------------------------------------

  async update(userEmail: string, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.findOne({ where: { userEmail } });
    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }
    const updatedUser = Object.assign(user, updateUserDto);
    return await this.userRepository.save(updatedUser);
  }

}

